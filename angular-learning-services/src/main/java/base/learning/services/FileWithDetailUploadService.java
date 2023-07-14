package base.learning.services;

import java.util.LinkedHashMap;
import java.util.Map;

import org.bson.Document;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import base.learning.util.DateTimeUtil;

@Service
public class FileWithDetailUploadService {

	public Map<String, String> saveFileDetail(Map<String, Object> fileDetail) {
		// TODO Auto-generated method stub
		return null;
	}

	public void logUserActivity(Map<String, Object> log) {
		// TODO Auto-generated method stub
		
	}

	public Map<String, String> updateFileDetail(Map<String, Object> fileDetail) {
		// TODO Auto-generated method stub
		return null;
	}

	public Object findFileDetailByName(String fileName) {
		// TODO Auto-generated method stub
		return null;
	}

	public Object findAllFiles() {
		// TODO Auto-generated method stub
		return null;
	}

	public Object findBetweenStartEndDates(String startDate, String endDate) {
		// TODO Auto-generated method stub
		return null;
	}

	public Map<String, String> saveSubAua(MultipartFile fileData) {
		// TODO Auto-generated method stub
		return null;
	}

	public boolean updateFileName(String orgName, String fileName, String remoteAddr) {
		// TODO Auto-generated method stub
		return false;
	}

	public Document findFileDetail(String fileName) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public Map<String, String> validateInputParameters(Map<String, Object> subAuaDetail, boolean isNewEntry) {

		Map<String, String> error = new LinkedHashMap<>();
		
		if(subAuaDetail.get("orgName")==null || 
				subAuaDetail.get("orgName").toString().isEmpty())
			error.put("orgName", "Organization name not provided");
		
		if(isNewEntry && (subAuaDetail.get("deptName")==null || 
				subAuaDetail.get("deptName").toString().isEmpty()))
			error.put("deptName", "Department name not provided");
		
		Object permissions = subAuaDetail.get("uidaiPermission");
		
		if(permissions instanceof Map) {
			
			@SuppressWarnings("unchecked")
			Map<String, String> perms = (Map<String, String>) permissions;
			
			if(isNewEntry && (!("Yes".equals(perms.get("appSent")) || 
					"No".equals(perms.get("appSent")))))
				error.put("appSent", "value should be 'Yes' or 'No'");
			
			if(isNewEntry && (perms.get("dispatchNo")==null || 
					perms.get("dispatchNo").toString().isEmpty()))
				error.put("dispatchNo", "provide dispatch number");
			
			if(isNewEntry && (perms.get("permReceived")==null || 
					perms.get("permReceived").toString().isEmpty()))
				error.put("permReceived", "provide permission received 'Yes' or 'No'");
			
			if(isNewEntry &&(perms.get("permLetterNo")==null || 
					perms.get("permLetterNo").toString().isEmpty()))
				error.put("permLetterNo", "provide permission letter number");
			
			if(isNewEntry && (!"ok".equals(validateDate(perms.get("dispatchDate")))))
				error.put("dispatchDate", "provide permission dispatch date(dd-mm-yyyy)");
			
			if(isNewEntry && (!"ok".equals(validateDate(perms.get("permLetterDate")))))
				error.put("permLetterDate", "provide permission letter date(dd-mm-yyyy)");
			
			if(isNewEntry && (!("Yes".equals(perms.get("licenseFeePaid")) || 
					"No".equals(perms.get("licenseFeePaid")))))
				error.put("licenseFeePaid", "provide license fee paid 'Yes' or 'No'");
		} else if(isNewEntry)
			error.put("uidaiPermission", "Uidai Permission detail not found");
		
		return error;
	}
	
	private long getLong(String text) {
		try {
			return Long.parseLong(text);
		} catch(Exception ex) {
			if(text!=null&&text.trim().isEmpty())
				return 0;
			
			throw ex;
		}
	}
	
	private String validateDate(String dateText) {
		try {
			DateTimeUtil.getDDMMYYYYHHMMSS(dateText.toString());
			return "ok";
		} catch(Exception ex) {
			return ex.getMessage();
		}
	}
}
