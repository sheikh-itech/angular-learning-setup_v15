package base.learning.conf;

import java.util.Properties;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.core.annotation.Order;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import base.learning.AngularLearningApplication;

/**
 * This configuration required for production environment,
 * Keep properties files inside 'learning-config' folder in server's 'webapps' directory
 * 
 * @MessageSource bean loads properties 'messages/encrypt_en' & '/messages/encrypt_hin'
 * from class-path, contains standard messages to be used
 * 
 * @Properties bean loads all private properties, 
 * access all private properties using this bean
 * 
 * @author Hapheej
 * @since 1.0.0
 */

@Configuration
@Order(1)
public class ServletInitializer extends SpringBootServletInitializer {

	private static final Logger logger = LogManager.getLogger(ServletInitializer.class);
	
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(AngularLearningApplication.class).properties(loadConfiguration());
	}
	
	private Properties loadConfiguration() {
		
		Properties props = new Properties();
	    props.put("spring.config.location", "./webapps/learning-config/");
	    return props;
	}
	
	@Bean
	public MessageSource messageSource() {
	    ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
	    messageSource.setBasenames("classpath:/messages/encrypt_en", "classpath:/messages/encrypt_hin");
	    //messageSource.setCacheSeconds(0); //To refresh in every specified seconds
	    return messageSource;
	}
	
	@Primary
	@Bean
	public Properties loadPrivateProperties() {
		
		Properties properties = new Properties();
		try {
			properties.load(this.getClass().getResourceAsStream("/private-config/user-detail.properties"));
			Properties prop1 = new Properties();
			prop1.load(this.getClass().getResourceAsStream("/private-config/encrypt-detail.properties"));
			
			properties.putAll(prop1);
			
		} catch (Exception ex) {
			logger.info("Error Loading private configuration: "+ex.getMessage());
		}
		logger.info("Loaded private configuration");
		return properties;
	}
	
	@Primary
	@Bean(name = "encryptorBean")
	public StringEncryptor stringEncryptor() {

		PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
		SimpleStringPBEConfig config = new SimpleStringPBEConfig();
		
		//This/Password should be 18 in length
		config.setPassword("encryption-service");
		config.setAlgorithm("PBEWITHHMACSHA512ANDAES_256");
		config.setKeyObtentionIterations("1000");
		config.setPoolSize("1");
		config.setProviderName("SunJCE");
		config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator");
		config.setIvGeneratorClassName("org.jasypt.iv.RandomIvGenerator");
		config.setStringOutputType("base64");
		encryptor.setConfig(config);
		
		logger.info("Encryption support initialized");
		
		return encryptor;
	}
	/* Spring security starter required
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
       	
    	http.csrf().disable()
    	.authorizeRequests().antMatchers("/**").permitAll();
    	
    	http.csrf().disable()
    	.authorizeRequests().antMatchers("/**").permitAll().
				anyRequest().authenticated().and().
				exceptionHandling().and().sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    	http.addFilterBefore(appFilter, UsernamePasswordAuthenticationFilter.class);
    	
        return http.build();
    }
	*/
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
            	registry.addMapping("/**").allowedOrigins("*")
            	.allowedMethods("*").allowedHeaders("*");
            }
        };
    }
}
