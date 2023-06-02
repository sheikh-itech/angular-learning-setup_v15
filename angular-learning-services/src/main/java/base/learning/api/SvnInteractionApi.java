package base.learning.api;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.tmatesoft.svn.core.SVNCommitInfo;
import org.tmatesoft.svn.core.SVNDepth;
import org.tmatesoft.svn.core.SVNLock;
import org.tmatesoft.svn.core.SVNNodeKind;
import org.tmatesoft.svn.core.SVNURL;
import org.tmatesoft.svn.core.auth.BasicAuthenticationManager;
import org.tmatesoft.svn.core.auth.ISVNAuthenticationManager;
import org.tmatesoft.svn.core.internal.io.dav.DAVRepositoryFactory;
import org.tmatesoft.svn.core.internal.io.fs.FSRepositoryFactory;
import org.tmatesoft.svn.core.internal.io.svn.SVNRepositoryFactoryImpl;
import org.tmatesoft.svn.core.io.ISVNEditor;
import org.tmatesoft.svn.core.io.SVNRepository;
import org.tmatesoft.svn.core.io.SVNRepositoryFactory;
import org.tmatesoft.svn.core.io.diff.SVNDeltaGenerator;
import org.tmatesoft.svn.core.wc.SVNClientManager;
import org.tmatesoft.svn.core.wc.SVNInfo;
import org.tmatesoft.svn.core.wc.SVNRevision;
import org.tmatesoft.svn.core.wc.SVNUpdateClient;
import org.tmatesoft.svn.core.wc.SVNWCClient;

import base.learning.beans.Response;

/**
 * This version of svn interaction assumes-
 * 1. All files are under parent directory
 * 2. All addition, deletion or modification will happen in parent directory
 * 
 * @author Hapheej
 */
@RestController
@RequestMapping("svn")
public class SvnInteractionApi {

	private SVNRepository repository;
	private SVNDeltaGenerator deltaGenerator;
	private SVNWCClient wcClient;
	private SVNClientManager clientManager;
	private SVNUpdateClient updateClient;
	
	@Value("${svn.root.dir:''}")
	private String svnRootDir;
	@Value("${svn.file.dir:''}")
	private String svnFileDir;
	@Value("${svn.username:''}")
	private String username;
	@Value("${svn.password:''}")
	private String password;
	@Value("${svn.file.separator:/}")
	private String pathSeparator;
	
	
	//Checkout's SVN repository provided in properties file
	@RequestMapping(value = "/checkout", method = RequestMethod.POST)
	public ResponseEntity<Response> checkoutUpdateSVN(@PathParam("localPath") String localPath,
			HttpServletRequest request) {
		
		Response res = new Response();
		try {
			SVNURL url = SVNURL.parseURIEncoded(svnRootDir);
			
	        try {
	        	SVNLock[] locks = repository.getLocks("");
	            
	            for (SVNLock lock : locks) {
	            	String lockPath = lock.getPath();
	                wcClient.doRevert(new File[]{new File(lockPath)}, SVNDepth.INFINITY, null);
	                wcClient.doCleanup(new File(lockPath));
	                
	                System.out.println("Lock removed and changes reverted for path: " + lockPath);
	            }
	        } catch (Exception ex) {
	            ex.printStackTrace();
	            res.setStatus(false);
	            res.setMessage("File lock release error");
	            res.setError(ex.getMessage());
	            return new ResponseEntity<Response>(res, HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	        SVNInfo info = null;
    		try {
    			info = wcClient.doInfo(new File(localPath), SVNRevision.WORKING);
    		} catch(Exception ex) {
    			System.err.println("Fresh checkout needed");
    		}
	        
	        //Perform the checkout/update
	        updateClient = clientManager.getUpdateClient();
	        updateClient.setIgnoreExternals(false);
	        
	        res.setStatus(true);
	        
	        if (info != null && info.getURL().equals(url)) {
	            // Perform an update if the URL matches
	            updateClient.doUpdate(new File(localPath), SVNRevision.HEAD, SVNDepth.INFINITY, true, false);
	            
	            res.setMessage("SVN repository exists, updating it");
	            return new ResponseEntity<Response>(res, HttpStatus.CREATED);
	        } else {
	            //Perform a fresh checkout if the URL does not match
	        	updateClient.doCheckout(url, new File(localPath), SVNRevision.HEAD, SVNRevision.HEAD, SVNDepth.INFINITY, false);
	            res.setMessage("SVN repository checked out");
	            return new ResponseEntity<Response>(res, HttpStatus.CREATED);
	        }
		} catch(Exception ex) {
			ex.printStackTrace();
			res.setStatus(false);
            res.setMessage("File lock release error");
            res.setError(ex.getMessage());
			return new ResponseEntity<Response>(res, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//Send Form-Data from browser OR subAuaFile->file & orgName-> any name from Postman
	@RequestMapping(value = "/file/add", method = RequestMethod.POST)
	public ResponseEntity<Response> addFileToSVN(@RequestPart String logMessage, @RequestPart String orgName,
			@RequestPart MultipartFile subAuaFile, HttpServletRequest request) {
		
		Response res = new Response();
		SVNCommitInfo info = null;
		try {
			String fileName = subAuaFile.getOriginalFilename();
			String relFilePath = svnFileDir+pathSeparator+fileName;
			
			logMessage = logMessage + "User: Hapheej, Ip: "+request.getRemoteAddr();
			
			long revision = repository.getLatestRevision();
			
	        ISVNEditor editor = repository.getCommitEditor(logMessage, null /*locks*/, false /*keepLocks*/, null /*mediator*/);
	        
	        editor.openRoot(revision);
	        editor.openDir(svnFileDir, revision);
	        
	        editor.addFile(relFilePath, null, revision);
	        editor.applyTextDelta(relFilePath, null);
	        
	        String checksum = deltaGenerator.sendDelta(relFilePath, new ByteArrayInputStream(subAuaFile.getBytes()), editor, true);
	        editor.closeFile(relFilePath, checksum);
	        
	        editor.closeDir();
	        editor.closeDir();
	        
	        info = editor.closeEdit();

	        res.setStatus(true);
	        res.setMessage("File added successfully");
	        res.setData("Author: "+info.getAuthor()+", Revision: "+info.getNewRevision());
	        
	        return new ResponseEntity<Response>(res, HttpStatus.CREATED);
		} catch(Exception ex) {
			ex.printStackTrace();
			res.setStatus(false);
	        res.setMessage("File add failed");
	        res.setError(ex.getMessage());
	        if(info!=null)
	        	res.setData("Author: "+info.getAuthor()+", Revision: "+info.getNewRevision());
	        
	        return new ResponseEntity<Response>(res, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value = "/file/update", method = RequestMethod.POST)
	public ResponseEntity<Response> updateFileToSvn(@RequestPart String logMessage, @RequestPart String orgName,
			@RequestPart MultipartFile subAuaFile, HttpServletRequest request) {
		
		Response res = new Response();
		SVNCommitInfo info = null;
		
		try {
			logMessage = logMessage + "User: Hapheej, Ip: "+request.getRemoteAddr();
			
			String fileName = subAuaFile.getOriginalFilename();
			String relFilePath = svnFileDir+pathSeparator+fileName;
			
			long revision = repository.getLatestRevision();
			
	        SVNNodeKind fileKind = repository.checkPath(relFilePath, revision);
	        
	        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
	        
	        if (fileKind != SVNNodeKind.FILE)
	        	throw new Exception("File not found in latest revision");
	        
	        repository.getFile(relFilePath, revision, null, outputStream);
	        
	        ISVNEditor editor = repository.getCommitEditor(logMessage , null /*locks*/ , false /*keepLocks*/ , null /*mediator*/ );
	        
	        editor.openRoot(revision);
	        editor.openDir(svnRootDir, revision);
	        editor.openFile(relFilePath, revision);
	        
	        editor.applyTextDelta(relFilePath , null );
	        
	        String baseChecksum = deltaGenerator.sendDelta(relFilePath, 
	        		new ByteArrayInputStream(outputStream.toByteArray()), 0, 
	        		new ByteArrayInputStream(subAuaFile.getBytes()), editor, true);
	        
	        editor.closeFile(relFilePath, baseChecksum);
	        editor.closeDir();
	        editor.closeDir();
	        info = editor.closeEdit();

	        res.setStatus(true);
	        res.setMessage("File updated successfully");
	        res.setData("Author: "+info.getAuthor()+", Revision: "+info.getNewRevision());
	        
	        return new ResponseEntity<Response>(res, HttpStatus.CREATED);
		} catch(Exception ex) {
			ex.printStackTrace();
			res.setStatus(false);
	        res.setMessage("File update failed");
	        res.setError(ex.getMessage());
	        if(info!=null)
	        	res.setData("Author: "+info.getAuthor()+", Revision: "+info.getNewRevision());
	        return new ResponseEntity<Response>(res, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value = "/file/download/{fileName}", method = RequestMethod.GET)
	public ResponseEntity<?> downloadFileFromSvn(@PathVariable("fileName") String fileName) {
		
		Response res = new Response();
		try {
			String relFilePath = svnFileDir+pathSeparator+fileName;
			
			long revision = repository.getLatestRevision();
			SVNNodeKind fileKind = repository.checkPath(relFilePath, revision);
			
	        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
	        
	        if (fileKind != SVNNodeKind.FILE)
	        	throw new Exception("File not found");
	        
	        repository.getFile(relFilePath, revision, null, outputStream);
	        
	        String mediaType = determineMediaType(fileName);
	        
	        HttpHeaders headers = new HttpHeaders();
			
			headers.add("Access-Control-Expose-Headers", "Content-Disposition");
			headers.add("Access-Control-Expose-Headers", "Content-Type");
			headers.add("Content-Type", mediaType);
			headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", fileName));
			headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
			headers.add("Pragma", "no-cache");
			headers.add("Expires", "0");
	        
			byte[] array = outputStream.toByteArray();
			outputStream.close();
			return ResponseEntity.ok().headers(headers).contentLength(array.length).body(array);
		} catch(Exception ex) {
			ex.printStackTrace();
			res.setStatus(false);
	        res.setMessage("File download failed");
	        res.setError(ex.getMessage());
	        return new ResponseEntity<Response>(res, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//Checkout and SVN repository
	@RequestMapping(value = "/checkout/update", method = RequestMethod.POST)
	public ResponseEntity<Response> checkoutUpdateFromSVN(@RequestBody Map<String, String> svnInfo,
			HttpServletRequest request) {
		
		String localPath = svnInfo.get("localPath");
		String svnRoot = svnInfo.get("svnRoot");
		String username = svnInfo.get("username");
		String password = svnInfo.get("password");
		
		SVNURL svnUrl = null;
		SVNRepository repository = null;
		SVNWCClient wcClient = null;
		SVNClientManager clientManager = null;
		try {
			
			if(username.isEmpty()||password.isEmpty()||svnRoot.isEmpty())
	        	throw new Exception("Svn username, password or directory not found");
			
			svnUrl = SVNURL.parseURIEncoded(svnRoot);
			
			DAVRepositoryFactory.setup();
	        SVNRepositoryFactoryImpl.setup();
	        FSRepositoryFactory.setup();
	        System.setProperty("svnkit.http.timeout", "60");
	        
	        clientManager = SVNClientManager.newInstance();
	        
	        wcClient = clientManager.getWCClient();
	        
	        ISVNAuthenticationManager authManager = BasicAuthenticationManager.newInstance(username, password.toCharArray());
	        
	        clientManager.setAuthenticationManager(authManager);
	        
	        repository = SVNRepositoryFactory.create(svnUrl);
	        repository.setAuthenticationManager(authManager);
	        
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		
		Response res = new Response();
		try {
			
	        try {
	        	SVNLock[] locks = repository.getLocks("");
	            
	            for (SVNLock lock : locks) {
	            	String lockPath = lock.getPath();
	                wcClient.doRevert(new File[]{new File(lockPath)}, SVNDepth.INFINITY, null);
	                wcClient.doCleanup(new File(lockPath));
	                
	                System.out.println("Lock removed and changes reverted for path: " + lockPath);
	            }
	        } catch (Exception ex) {
	            ex.printStackTrace();
	            res.setStatus(false);
	            res.setMessage("File lock release error");
	            res.setError(ex.getMessage());
	            return new ResponseEntity<Response>(res, HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	        
	        SVNInfo info = wcClient.doInfo(new File(localPath), SVNRevision.WORKING);
	        
	        //Perform the checkout/update
	        SVNUpdateClient updateClient = clientManager.getUpdateClient();
	        updateClient.setIgnoreExternals(false);
	        
	        res.setStatus(true);
	        
	        if (info != null && info.getURL().equals(svnUrl)) {
	            // Perform an update if the URL matches
	            updateClient.doUpdate(new File(localPath), SVNRevision.HEAD, SVNDepth.INFINITY, true, false);
	            
	            res.setMessage("SVN repository exists, updating it");
	            return new ResponseEntity<Response>(res, HttpStatus.CREATED);
	        } else {
	            // Perform a fresh checkout if the URL does not match
	        	updateClient.doCheckout(svnUrl, new File(localPath), SVNRevision.HEAD, SVNRevision.HEAD, SVNDepth.INFINITY, false);
	        	//updateClient.doCheckout(url, new File(localPath), SVNRevision.HEAD, SVNRevision.HEAD, SVNDepth.INFINITY, true);
	            
	            res.setMessage("SVN repository checked out");
	            return new ResponseEntity<Response>(res, HttpStatus.CREATED);
	        }
		} catch(Exception ex) {
			ex.printStackTrace();
			res.setStatus(false);
            res.setMessage("File lock release error");
            res.setError(ex.getMessage());
			return new ResponseEntity<Response>(res, HttpStatus.INTERNAL_SERVER_ERROR);
		}       
	}
	
	private String determineMediaType(String fileName) {
	    // Example: determine media type based on file extension
	    if (fileName.endsWith(".pdf")) {
	        return "application/pdf";
	    } else if (fileName.endsWith(".txt")||fileName.endsWith(".properties")) {
	        return "text/plain";
	    } else {
	        // Default to octet-stream if the media type is unknown
	        return "application/octet-stream";
	    }
	}
	
	@PreDestroy
    public void clean() {
		try {
			System.err.println("Closing SVN session");
			repository.closeSession();
			clientManager.dispose();
		} catch(Exception ex) {
			System.err.println("SVN session closing error");
		}
	}
	
	@PostConstruct
	public void init() {
		
		try {
			
			if(username.isEmpty()||password.isEmpty()||svnRootDir.isEmpty())
	        	throw new Exception("Svn username, password or directory not found");
			
			SVNURL svnUrl = SVNURL.parseURIEncoded(svnRootDir);
			
			DAVRepositoryFactory.setup();
	        SVNRepositoryFactoryImpl.setup();
	        FSRepositoryFactory.setup();
	        System.setProperty("svnkit.http.timeout", "60");
	        
	        // Create a new SVN checkout/update client
	        clientManager = SVNClientManager.newInstance();
	        
	        wcClient = clientManager.getWCClient();
	        
	        ISVNAuthenticationManager authManager = BasicAuthenticationManager.newInstance(username, password.toCharArray());
	        
	        clientManager.setAuthenticationManager(authManager);
	        
	        repository = SVNRepositoryFactory.create(svnUrl);
	        repository.setAuthenticationManager(authManager);
	        
	        deltaGenerator = new SVNDeltaGenerator();
		} catch (Exception ex) {
			ex.printStackTrace();
		}		
	}
}
