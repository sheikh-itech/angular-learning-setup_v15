package base.learning.api;

import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import base.learning.beans.Product;
import base.learning.beans.ProductQRInfo;
import base.learning.beans.Response;
import base.learning.services.ZXingQRCodeGenerator;

@RestController
@RequestMapping("QR")
public class ZXingQRCodeApi {

	@Autowired
	private ZXingQRCodeGenerator qrCodeGenerator;
	
	
	@RequestMapping(value="/generate", method=RequestMethod.POST)
	public ResponseEntity<Response> generateQRCode(@RequestBody Product productInfo) {
		
		Response res = new Response();
		
		try {
			productInfo = qrCodeGenerator.generateQRCode(productInfo);
			res.setStatus(true);
			res.setData(productInfo);
			res.setMessage("QR Code generated, save Id for future reference");
			return new ResponseEntity<Response>(res, HttpStatus.CREATED);
		} catch(Exception ex) {
			res.setStatus(false);
			res.setData(productInfo);
			res.setError(ex.getMessage());
			return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
		}		
	}
	
	@RequestMapping(value = "/download", method = RequestMethod.POST)
    public ResponseEntity<InputStreamResource> searchQrCode(@RequestBody Map<String, String> payload) {

		String id = payload.get("id");
		String name = payload.get("name");
		
        ResponseEntity<InputStreamResource> responseEntity;

        try {
            ProductQRInfo qrCodeInfo = null;
            
            if(id!=null && !id.isEmpty())
            	qrCodeInfo = qrCodeGenerator.findQRCodeById(id);
            else
            	qrCodeInfo = qrCodeGenerator.findQRCodeByName(name);

            if(qrCodeInfo==null)
            	throw new FileNotFoundException("Requested QR Code not found");
            
            byte[] imageBytes = qrCodeInfo.getQrBytes();

            //Create the InputStreamResource from the byte array
            InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(imageBytes));

            //Set the response headers
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", MediaType.IMAGE_PNG_VALUE);
            headers.add("Content-Disposition", "attachment; filename=\"qrcode.png\"");
            headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
            headers.add("Pragma", "no-cache");
            headers.add("Expires", "0");

            //Create the ResponseEntity with the image data and headers
            responseEntity = ResponseEntity.created(null)
                    .headers(headers)
                    .contentLength(imageBytes.length)
                    .contentType(MediaType.IMAGE_PNG)
                    .body(resource);

        } catch(FileNotFoundException ex) {
        	responseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception ex) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return responseEntity;
    }
	
	@RequestMapping(value = "/download/all", method = RequestMethod.GET)
    public ResponseEntity<Response> searchAllQrCodeInfo() {

        Response response = new Response();

        try {
            response.setStatus(true);
            response.setMessage("All QR code info");
            response.setData(qrCodeGenerator.findAllQRCodeInfo());
            return new ResponseEntity<Response>(response, HttpStatus.OK);
            
        } catch (Exception ex) {
        	response.setStatus(false);
        	response.setError("QR info search error: "+ex.getMessage());
        	return new ResponseEntity<Response>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
