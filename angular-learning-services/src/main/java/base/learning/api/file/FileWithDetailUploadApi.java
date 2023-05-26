package base.learning.api.file;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import base.learning.beans.Response;
import base.learning.services.FileWithDetailUploadService;
import base.learning.services.LogService;

@RestController
@RequestMapping("upload")
public class FileWithDetailUploadApi {

	private static final Logger logger = LoggerFactory.getLogger(FileWithDetailUploadApi.class);
	
	@Autowired
	private ObjectMapper objectMapper;
	@Autowired
	private FileWithDetailUploadService fileService;
	@Autowired
	private LogService logService;
	
	@Value("${max.file.zise:500}")
	private long maxFileSize;
	@Value("${file.storage.path:/}")
	private String fileSaveDir;
	
	
	@RequestMapping(value = "/file/detail", method = RequestMethod.POST)
	public ResponseEntity<Response> addSubAua(@RequestBody Map<String, Object> fileDetail, 
			HttpServletRequest request) {

		Map<String, Object> log = new LinkedHashMap<>();
		Response res = new Response();
		
		try {
			fileDetail.put("ip", request.getRemoteAddr());
			Map<String, String> response = fileService.saveFileDetail(fileDetail);
			
			if(response!=null) {
				res.setStatus(false);
				res.setMessage("failure");
				res.setError("Incomplete Sub-Aua detail, more info-> check response data");
				res.setData(response);
				
				log.put("status", "Incomplete Sub-Aua detail");
				log.put("fieldList", fileDetail);
				fileService.logUserActivity(log);
				
				return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
			}
			
			res.setStatus(true);
			res.setMessage("Sub-Aua detail added successfully, orgName: "+fileDetail.get("orgName"));
			res.setData(fileDetail);
			
			log.put("status", "Sub-Aua detail added successfully");
			log.put("fieldList", fileDetail);
			logService.logUserActivity(log);
			
			logger.info(res.getMessage()+", machine: "+request.getRemoteAddr());
			
			return new ResponseEntity<Response>(res, HttpStatus.CREATED);
		} catch(Exception ex) {
			
			res.setStatus(false);
			res.setMessage("failure");
			if(ex.getMessage().contains("duplicate key")) {
				res.setError("Sub-Aua detail save error: organization name already exists");
				log.put("status", res.getError());
			} else {
				res.setError("Sub-Aua detail save error: "+ex.getMessage());
				log.put("status", res.getError());
			}
			log.put("fieldList", fileDetail);
			logService.logUserActivity(log);
			
			logger.error(res.getError()+", orgName: "+fileDetail.get("orgName")+", machine: "+request.getRemoteAddr());
			return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/file/update/detail", method = RequestMethod.PATCH)
	public ResponseEntity<Response> updateSubAua(@RequestBody Map<String, Object> fileDetail, 
			HttpServletRequest request) {
		
		Map<String, Object> log = new LinkedHashMap<>();
		Response res = new Response();

		try {
			fileDetail.put("ip", request.getRemoteAddr());
			Map<String, String> outcome = fileService.updateFileDetail(fileDetail);
			
			res.setStatus(true);
			int updateRecords = outcome.get("updateRecords")!=null?Integer.parseInt(outcome.get("updateRecords")):-1;
			
			if(outcome.containsKey("matchRecords") && updateRecords<=0) {
				res.setData(outcome);
				res.setMessage("Sub-Aua detail not available, orgName: "+fileDetail.get("orgName"));
				log.put("status", res.getMessage());
			} 
			else if(updateRecords>0) {
				res.setData(fileDetail);
				res.setMessage("Sub-Aua detail updated, orgName: "+fileDetail.get("orgName"));
				log.put("status", res.getMessage());
			}
			else {
				res.setStatus(false);
				res.setMessage("failure");
				res.setError("Sub-Aua detail update error, more info-> check response data");
				res.setData(outcome);
				
				log.put("status", "Sub-Aua detail update error: "+fileDetail);
				log.put("fieldList", fileDetail);
				logService.logUserActivity(log);
				
				logger.error("Sub-Aua detail update error: , orgName: "+
						fileDetail.get("orgName")+", machine: "+request.getRemoteAddr());
				
				return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
			}
			
			log.put("fieldList", fileDetail);
			logService.logUserActivity(log);
			
			logger.info(res.getMessage()+", machine: "+request.getRemoteAddr());
			
			return new ResponseEntity<Response>(res, HttpStatus.OK);
			
		} catch (Exception ex) {
			res.setStatus(false);
			res.setMessage("failure");
			res.setError("Sub-Aua detail update error: "+ex.getMessage());
			
			log.put("status", res.getError());
			log.put("fieldList", fileDetail);
			logService.logUserActivity(log);
			
			logger.error(res.getError()+", orgName"+ 
					fileDetail.get("orgName")+", machine: "+request.getRemoteAddr());
			
			return new ResponseEntity<Response>(res, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value = "/list/{fileName}", method = RequestMethod.GET)
	public ResponseEntity<Response> getSubAuaDetail(@PathVariable(value = "fileName") 
		String fileName, HttpServletRequest request) {

		Response res = new Response();

		try {
			
			res.setData(fileService.findFileDetailByName(fileName));
			res.setStatus(true);
			res.setMessage("Sub-Aua detail for organization name: "+fileName);
			
			logger.info("Detail searched for orgName: "+fileName+", machine: "+request.getRemoteAddr());
			
			return new ResponseEntity<Response>(res, HttpStatus.OK);
			
		} catch (Exception ex) {
			res.setStatus(false);
			res.setMessage("failure");
			res.setError("Sub-Aua detail search error: "+ex.getMessage());
			res.setData("orgName: "+fileName);
			
			logger.error("Detail search issue orgName: "+fileName+", machine: "+request.getRemoteAddr()+", error: "+ex.getMessage());
			
			return new ResponseEntity<Response>(res, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value = "/list/all", method = RequestMethod.GET)
	public ResponseEntity<Response> getAllSubAuaDetail(HttpServletRequest request) {

		Response res = new Response();

		try {
			
			res.setData(fileService.findAllFiles());
			res.setStatus(true);
			res.setMessage("Sub-Aua details for all organization");
			
			logger.info("Detail of all available organizations served, machine: "+request.getRemoteAddr());
			
			return new ResponseEntity<Response>(res, HttpStatus.OK);
			
		} catch (Exception ex) {
			res.setStatus(false);
			res.setMessage("failure");
			res.setError("All Sub-Aua detail search error: "+ex.getMessage());
			
			logger.error("All Sub-Aua detail search error: "+ex.getMessage()+", machine: "+request.getRemoteAddr());
			
			return new ResponseEntity<Response>(res, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value = "/list/{startDate}/{endDate}", method = RequestMethod.GET)
	public ResponseEntity<Response> getSubAuaOnDateRange(@PathVariable(value="startDate") 
		String startDate, @PathVariable(value="endDate") String endDate, HttpServletRequest request) {

		Response res = new Response();

		try {
			
			res.setData(fileService.findBetweenStartEndDates(startDate, endDate));
			res.setStatus(true);
			res.setMessage("Sub-Aua details between startDate:"+startDate+", endDate: "+endDate);
			
			logger.info("Sub-Aua details between "+startDate+" and "+endDate+" served, machine: "+request.getRemoteAddr());
			
			return new ResponseEntity<Response>(res, HttpStatus.OK);
			
		} catch (Exception ex) {
			res.setStatus(false);
			res.setMessage("failure");
			res.setError("Sub-Aua details between startDate:"+startDate+", endDate: "+endDate+" search error: "+ex.getMessage());
			
			logger.error("Sub-Aua details between "+startDate+" and "+endDate+" search issue, machine: "+request.getRemoteAddr()+"error: "+ex.getMessage());
			
			return new ResponseEntity<Response>(res, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value = "/file/addWithFile", method = RequestMethod.POST)
	public ResponseEntity<Response> addSubAuaWithFile(@RequestPart MultipartFile fileData, 
			@RequestPart String fileDetail, HttpServletRequest request) {
		
		Response res = new Response();
		Map<String, Object> log = new LinkedHashMap<>();
		
		Map<String, Object> subAuaData = null;
		
		try {
			subAuaData = objectMapper.readValue(fileDetail, new TypeReference<Map<String, Object>>() {});
	    } catch (Exception ex) {
	    	res.setStatus(false);
			res.setMessage("failure");
			res.setError("Sub-Aua detail read error: "+ex.getMessage());
			
			log.put("status", res.getError());
			log.put("fieldList", fileDetail);
			logService.logUserActivity(log);
			
			logger.error(res.getError()+", machine: "+request.getRemoteAddr());
			return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
	    }
		
		try {
			
			subAuaData.put("ip", request.getRemoteAddr());
			subAuaData.put("fileName", fileData.getOriginalFilename());
			
			Map<String, String> response = fileService.saveSubAua(fileData);
			
			String message = "Sub-Aua detail added successfully";
			String error = null;
			if(response!=null) {
				res.setStatus(false);
				res.setMessage("failure");
				res.setError("Incomplete Sub-Aua detail, more info-> check response data");
				res.setData(response);
				
				logger.error("Incomplete Sub-Aua detail, machine: "+request.getRemoteAddr());
				
				return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
				
			} else {
				try {
					this.saveSubAuaFile(fileData, subAuaData.get("orgName").toString());
				} catch(Exception ex) {
					message += ", but file detail save failed";
					error = "File info save error: "+ex.getMessage();
					logger.error(error+", machine: "+request.getRemoteAddr());
				}
			}
			
			res.setStatus(true);
			res.setMessage(message+", orgName: "+subAuaData.get("orgName"));
			res.setData(fileDetail);
			res.setError(error);
			
			log.put("status", message);
			log.put("fieldList", fileDetail);
			logService.logUserActivity(log);
			
			logger.info(res.getMessage()+", machine: "+request.getRemoteAddr());
			
			return new ResponseEntity<Response>(res, HttpStatus.CREATED);
		} catch(Exception ex) {
			
			res.setStatus(false);
			res.setMessage("failure");
			if(ex.getMessage().contains("duplicate key")) {
				res.setError("Sub-Aua detail save error: organization name already exists");
				log.put("status", res.getError());
			} else {
				res.setError("Sub-Aua detail save error: "+ex.getMessage());
				log.put("status", res.getError());
			}
			log.put("fieldList", fileDetail);
			logService.logUserActivity(log);
			
			logger.error(res.getError()+", orgName: "+subAuaData.get("orgName")+", machine: "+request.getRemoteAddr());
			return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/file/updateFile", method = RequestMethod.POST)
	public ResponseEntity<Response> saveSubAuaFileDetail(@RequestPart MultipartFile subAuaFile, 
			@RequestParam String orgName, HttpServletRequest request) {
		
		Response res = new Response();
		Map<String, Object> log = new LinkedHashMap<>();
		
		try {
			
			String fileName = subAuaFile.getOriginalFilename();
			String fileType = fileName.substring(fileName.lastIndexOf(".")+1);
			
			if(fileName.contains(" "))
				throw new Exception("Space not allowed in file name");
			
			if((subAuaFile.getSize()/1024) > (float)maxFileSize)
				throw new Exception("File size exceeds maximum allowed size: "+(maxFileSize/1024)+" MB");
			
			if(!fileType.equalsIgnoreCase("pdf"))
				throw new Exception("Only PDF file allowed");
			
			if(fileService.updateFileName(orgName, fileName, request.getRemoteAddr())) {
				
				this.saveSubAuaFile(subAuaFile, orgName);
				
				res.setStatus(true);
				res.setMessage("File detail saved successfully");
				res.setData("orgName: "+orgName);
				
				log.put("status", res.getMessage());
				log.put("orgName", orgName);
				log.put("fileName", subAuaFile.getOriginalFilename());
				logService.logUserActivity(log);
				
				return new ResponseEntity<Response>(res, HttpStatus.CREATED);
			}
			throw new Exception("File name update error to database");
		} catch(Exception ex) {
			
			res.setStatus(false);
			res.setMessage("failure");
			res.setError("File detail save failed, error: "+ ex.getMessage());
			res.setData("orgName: "+orgName);
			
			log.put("status", res.getError());
			log.put("orgName", orgName);
			log.put("fileName", subAuaFile.getOriginalFilename());
			logService.logUserActivity(log);
			
			return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/file/download", method = RequestMethod.POST) 
	public ResponseEntity<InputStreamResource> downloadFile(@RequestBody String fileName) {
	   
		ResponseEntity<InputStreamResource> responseEntity = null;
		try {
			Document outcome = fileService.findFileDetail(fileName);
			fileName = outcome.get("fileName")!=null ? outcome.get("fileName").toString() : null;
			if(fileName==null)
				throw new FileNotFoundException("File Name not found");
			
			fileName = fileName.replaceAll(fileName+"_", "");
			
			File file = new File(fileSaveDir+ File.separator+fileName);
			
			if (!file.exists() || !file.canRead())
	            throw new FileNotFoundException("File not accessible");
			
			InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
			HttpHeaders headers = new HttpHeaders();
			
			headers.add("Access-Control-Expose-Headers", "Content-Disposition");
			headers.add("Access-Control-Expose-Headers", "Content-Type");
			headers.add("Content-Type", "application/pdf");
			headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", fileName));
			headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
			headers.add("Pragma", "no-cache");
			headers.add("Expires", "0");

			responseEntity = ResponseEntity.ok().headers(headers).contentLength(file.length()).contentType(
					MediaType.parseMediaType("application/pdf")).body(resource);
			
		} catch (FileNotFoundException ex) {
	        responseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	    } catch (Exception ex) {
	        responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	   
	   return responseEntity;
	}
	
	private void saveSubAuaFile(MultipartFile fileData, String orgName) throws Exception {
		
		String fileName = fileData.getOriginalFilename();
		
		if(fileSaveDir.indexOf("Sub-Aua-Files")>=3 && !new File(fileSaveDir).isDirectory())
			new File(fileSaveDir).mkdir();
		
		File newFile = new File(fileSaveDir+File.separator+(orgName+"_"+fileName));
		newFile.createNewFile();
		
		try(FileOutputStream out = new FileOutputStream(newFile)) {
			out.write(fileData.getBytes());
		}
	}
}
