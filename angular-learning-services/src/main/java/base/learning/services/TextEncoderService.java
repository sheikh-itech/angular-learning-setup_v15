package base.learning.services;

import java.util.Base64;
import java.util.Base64.Encoder;

import org.springframework.stereotype.Service;

@Service
public class TextEncoderService {

	private Encoder enc =  Base64.getEncoder();
	
	public static void main(String[] args) {
		Encoder enc =  Base64.getEncoder();
		String res = enc.encodeToString("लेना".getBytes());
		System.out.println(res);
	}

	
	/**	JavaScript Decode
	 * 	-----------------
		decodedData = Uint8Array.from(atob(<Encoded-Data>), c => c.charCodeAt(0));
		textDecoder = new TextDecoder('utf-8');
		decodedText = textDecoder.decode(decodedData);
	 */
	public String encodeBase64(String text) {
		
		return enc.encodeToString(text.getBytes());
	}
}
