package base.learning.conf;

import java.time.Duration;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

import base.learning.beans.User;

@Configuration
@EnableCaching
public class RedisConfiguration {

	
	@Bean
	public RedisTemplate<Integer, User> redisTemplate(RedisConnectionFactory connectionFactory) {
	    RedisTemplate<Integer, User> template = new RedisTemplate<>();
	    template.setConnectionFactory(connectionFactory);
	    return template;
	}
	
	@Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration();
        //config.setHostName("localhost");
        //config.setPort(6379);
        return new LettuceConnectionFactory(config);
    }

    @Bean
    public RedisCacheManager redisCacheManager() {
        RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(5));
        
        //entryTtl(Duration.ofMinutes(5))
        //This means that cache entries will expire and be removed from Redis after 5 minutes
        
        //entryTtl(Duration.ofMinutes(-1)).disableKeyPrefix();
        //Cache values never expire until server up
        //disableKeyPrefix()-> disables key prefix, which is added by default to cache keys
        
        return RedisCacheManager.builder(redisConnectionFactory())
                .cacheDefaults(redisCacheConfiguration)
                .build();
    }
}
