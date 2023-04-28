package base.learning.api.redis;

import redis.clients.jedis.Jedis;

/**
 * This example usages Redis Library/Jar
 * 
 * For Alternate Spring-Data-Redis see api
 * 
 * @author Hapheej
 */
public class RedisServerStandaloneTest {

	public static void main(String args[]) {

		//Connecting to Redis server on localhost
		//Jedis jedis = new Jedis(); //This will also word with localhost & default port
		Jedis jedis = new Jedis("http://127.0.0.1:6379");
		
		System.out.println("Connection to server sucess");

		//Check whether server is running or not
		System.out.println("Server is running: " + jedis.ping());
		
		//Set the data in redis string
		jedis.set("Server", "Redis Local Server");
		
		// Get the stored data and print it
		System.out.println("Stored string in redis:: " + jedis.get("Server"));
		
		jedis.close();
	}
}
