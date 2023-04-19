package base.learning.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import base.learning.beans.Response;
import base.learning.beans.UserDetail;
import base.learning.decrypt.CryptoJSDecryptor;
import base.learning.decrypt.CustomIVCryptoJSDecryptor;


@RestController
@RequestMapping("decrypt")
public class DecryptApi {

	@Autowired
	private CryptoJSDecryptor decryptUtil; //Or can register as @Bean in configuration
	@Autowired
	private CustomIVCryptoJSDecryptor advDecryptUtil;
	
	@RequestMapping(value="/user", method=RequestMethod.POST)
	public ResponseEntity<Response> decryptUser(@RequestBody UserDetail user) {
		
		Response res = new Response();
		res.setMessage("Done");
		res.setStatus(true);
		
		this.decryptUtil.decryptObjectFields(user);
		res.setData(user);
		
		return new ResponseEntity<Response>(res, HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/user/custom", method=RequestMethod.POST)
	public ResponseEntity<Response> customDecrypt(@RequestBody UserDetail user) {
		
		Response res = new Response();
		res.setMessage("Done");
		res.setStatus(true);
		
		this.advDecryptUtil.init(user.getPassword(), user.getEncKey());
		
		user.setPassword(null);
		user.setEncKey(null);
		
		this.advDecryptUtil.decryptObjectFields(user);
		
		res.setData(user);
		
		return new ResponseEntity<Response>(res, HttpStatus.CREATED);
	}
}
