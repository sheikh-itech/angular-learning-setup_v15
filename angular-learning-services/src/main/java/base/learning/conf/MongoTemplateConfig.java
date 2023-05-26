package base.learning.conf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.client.MongoClient;

@Configuration
@Order(1)
public class MongoTemplateConfig {

	@Value("${spring.data.mongodb.database:parichai-dashboard}")
	private String collectionName;
	
	private final MongoDatabaseFactory mongoDatabaseFactory;
	
	@Autowired
	public MongoTemplateConfig(MongoDatabaseFactory mongoDatabaseFactory) {
		this.mongoDatabaseFactory = mongoDatabaseFactory;
	}
	
	@Bean
    public MongoTemplate mongoTemplate(MongoClient mongoClient) {
		
		return new MongoTemplate(mongoClient, collectionName);
    }
	
	@Bean
    public MongoTransactionManager transactionManager() {
        return new MongoTransactionManager(mongoDatabaseFactory);
    }
}
