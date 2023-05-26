package base.learning.api;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tmatesoft.svn.core.SVNDepth;
import org.tmatesoft.svn.core.SVNDirEntry;
import org.tmatesoft.svn.core.SVNException;
import org.tmatesoft.svn.core.SVNLock;
import org.tmatesoft.svn.core.SVNNodeKind;
import org.tmatesoft.svn.core.SVNURL;
import org.tmatesoft.svn.core.auth.BasicAuthenticationManager;
import org.tmatesoft.svn.core.auth.ISVNAuthenticationManager;
import org.tmatesoft.svn.core.internal.io.dav.DAVRepositoryFactory;
import org.tmatesoft.svn.core.internal.io.fs.FSRepositoryFactory;
import org.tmatesoft.svn.core.internal.io.svn.SVNRepositoryFactoryImpl;
import org.tmatesoft.svn.core.io.SVNRepository;
import org.tmatesoft.svn.core.io.SVNRepositoryFactory;
import org.tmatesoft.svn.core.wc.SVNClientManager;
import org.tmatesoft.svn.core.wc.SVNInfo;
import org.tmatesoft.svn.core.wc.SVNRevision;
import org.tmatesoft.svn.core.wc.SVNUpdateClient;
import org.tmatesoft.svn.core.wc.SVNWCClient;

@RestController
@RequestMapping("svn/repo")
public class SvnRepositoryInteractionApi {

	public static void main(String args[]) {
		
		// Initialize the SVN library
        DAVRepositoryFactory.setup();
        SVNRepositoryFactoryImpl.setup();
        FSRepositoryFactory.setup();
        System.setProperty("svnkit.http.timeout", "60");
        //System.setProperty("svnkit.http.methods", "Basic;Digest;NTLM");
        try {
			checkout("https://164.100.196.78/svn/exceltoapi/artifacts", "hapheej", "H@pheej@123", "E:\\LatestEclipse_Workspace\\svn-test");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	public static void checkout(String svnUrl, String username, String password, String localPath) throws Exception {
        SVNURL url = SVNURL.parseURIEncoded(svnUrl);

        // Create a new SVN update client
        SVNClientManager clientManager = SVNClientManager.newInstance();
        
        SVNWCClient wcClient = clientManager.getWCClient();
        SVNRepository repository = null;
        ISVNAuthenticationManager authManager = null;
        
        // Set up authentication if necessary
        if (username != null && password != null)
        	authManager = BasicAuthenticationManager.newInstance(username, password.toCharArray());
        
        clientManager.setAuthenticationManager(authManager);
        
        
        repository = SVNRepositoryFactory.create(url);
        repository.setAuthenticationManager(authManager);
        
        try {
        	SVNLock[] locks = repository.getLocks("");
            
            for (SVNLock lock : locks) {
            	String lockPath = lock.getPath();
                wcClient.doRevert(new File[]{new File(lockPath)}, SVNDepth.INFINITY, null);
                wcClient.doCleanup(new File(lockPath));

                
                System.out.println("Lock removed and changes reverted for path: " + lockPath);
            }
        } catch (SVNException e) {
            e.printStackTrace();
        }
        
        String searchFile = "config.properties";
        List<String> downloadFileUrl = new ArrayList<>();
        
        SVNNodeKind rootKind = repository.checkPath("", 5);
        //String f="/artifacts/config/config.properties";
        //SVNNodeKind rootKind1 = repository.checkPath(f, 5);

        long rootRevision = 0;
        if (rootKind == SVNNodeKind.DIR) {
        	rootRevision = repository.getLatestRevision();

            listContent(repository, "", rootRevision, searchFile, downloadFileUrl);
        }
        
        if (!downloadFileUrl.isEmpty()) {
            String path = downloadFileUrl.get(0);
            long fileRevision = repository.getLatestRevision();
            File resultFile = new File(searchFile);
            
            SVNNodeKind fileKind = repository.checkPath(path, 5);
            
            if (fileKind == SVNNodeKind.FILE) {
                OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(resultFile));
                repository.getFile(path, fileRevision, null, outputStream);
                outputStream.close();

                System.out.println("File exported successfully.");
            } else {
                System.out.println("Specified path is not a file.");
            }
        } else {
            System.out.println("File not found in the repository.");
        }
        
        
        SVNInfo info = wcClient.doInfo(new File(localPath), SVNRevision.WORKING);
        
        // Perform the checkout/update
        SVNUpdateClient updateClient = clientManager.getUpdateClient();
        updateClient.setIgnoreExternals(false);
        
        if (info != null && info.getURL().equals(url)) {
            // Perform an update if the URL matches
            updateClient.doUpdate(new File(localPath), SVNRevision.HEAD, SVNDepth.INFINITY, true, false);
            System.out.println("Local path is already checked out. Performing update.");
        } else {
            // Perform a fresh checkout if the URL does not match
        	updateClient.doCheckout(url, new File(localPath), SVNRevision.HEAD, SVNRevision.HEAD, SVNDepth.INFINITY, false);
        	//updateClient.doCheckout(url, new File(localPath), SVNRevision.HEAD, SVNRevision.HEAD, SVNDepth.INFINITY, true);
            System.out.println("Performing fresh checkout.");
        }
    }
	
	@SuppressWarnings("unchecked")
	private static void listContent(SVNRepository repository, String path, long revision, String searchFile, List<String> downloadFileUrl) throws SVNException {
		Collection<SVNDirEntry> entries = repository.getDir(path, revision, null, (Collection<SVNDirEntry>) null);
        for (SVNDirEntry entry : entries) {
            String name = entry.getName();
            if(name.equalsIgnoreCase(searchFile))
            	downloadFileUrl.add(entry.getURL().toString().replaceFirst(entry.getRepositoryRoot().toString(), ""));           	
            
            if (entry.getKind() == SVNNodeKind.DIR)
                listContent(repository, entry.getRelativePath(), revision, searchFile, downloadFileUrl);
        }
    }
}
