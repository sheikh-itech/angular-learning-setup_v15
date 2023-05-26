package base.learning.services;

import java.util.Map;

import org.bson.Document;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

}
