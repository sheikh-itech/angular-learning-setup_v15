package base.learning.dao;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import base.learning.beans.Constants;

@Repository
public class LogDaoUtility {

	@Autowired
	private MongoTemplate mongoTemplate;

	public void persistLogActivity(Document document) {
		
		try {
			mongoTemplate.insert(document, Constants.LogCollection);
		} catch(Exception ex) {
			ex.printStackTrace();
		}		
	}	
}
