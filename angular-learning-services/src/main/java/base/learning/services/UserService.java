package base.learning.services;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import base.learning.beans.User;
import base.learning.repos.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private RedisTemplate<Integer, User> redisTemplate;
	
	
	public User saveUser(User user) {
		
		User outcome = userRepo.save(user);
		
		redisTemplate.opsForValue().set(outcome.getId(), outcome);
		
		return outcome;
	}
	
	public List<User> getAllUsers() {
		
		List<User> outcome = new ArrayList<>();
		
		outcome = userRepo.findAll();
		
		//Heavy Operation get keys then find/search
		if(outcome.isEmpty()) {
			RedisConnection connection = redisTemplate.getConnectionFactory().getConnection();
			Set<byte[]> keys = connection.keys("*".getBytes());
			outcome = new ArrayList<>();
			for (byte[] key : keys) {
			    Object res = redisTemplate.opsForValue().get(new BigInteger(key).intValue());
			    if (res != null && res instanceof User)
			    	outcome.add((User)res);
			}
		}
		return outcome;
	}
	
	public List<User> getUser(int id) {
		
		List<User> user =  new ArrayList<User>();

		User outcome = redisTemplate.opsForValue().get(id);

		if(outcome==null) {
			Optional<User> temp = userRepo.findById(id);
			if(temp.isPresent())
				outcome = temp.get();
			redisTemplate.opsForValue().set(outcome.getId(), outcome);
		}
		
		user.add(outcome);
		return user;
	}
	
	public Boolean deleteUser(int id) {
		
		redisTemplate.delete(id);
		
		userRepo.deleteById(id);
		
		return true;
	}
	
	public Boolean deleteAllUsers() {
		
		RedisConnection connection = redisTemplate.getConnectionFactory().getConnection();
		Set<byte[]> keys = connection.keys("*".getBytes());
		for (byte[] key : keys) {
			redisTemplate.delete(new BigInteger(key).intValue());
		}
		
		userRepo.deleteAll();
		
		return true;
	}
}
