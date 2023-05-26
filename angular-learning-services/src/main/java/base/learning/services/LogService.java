package base.learning.services;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import base.learning.dao.LogDaoUtility;

@Service
public class LogService {

	@Value("${activity.log.db:false}")
	private boolean logActivity;
	@Autowired
	private LogDaoUtility logDao;
	
	public void logUserActivity(Map<String, Object> logDetail) {
		
		try {
			if(logActivity)
				logDao.persistLogActivity(bindLogParams(logDetail));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private Document bindLogParams(Map<String, Object> logDetails) {
		
		Document document = new Document();

		logDetails.keySet().forEach(key -> document.append(key, logDetails.get(key)));

		document.append("loggedOn", 
				new SimpleDateFormat("dd-MM-yyyy hh:mm:ss").format(new Date()));
		
		return document;
	}
}
