package base.learning.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import base.learning.beans.Constants;
import base.learning.beans.Product;
import base.learning.beans.ProductInfo;
import base.learning.beans.ProductQRInfo;
import base.learning.conf.MongoTransactionalService;

@Repository
public class ZXingQRCodeDao {

	@Autowired
	private MongoTemplate mongoTemplate;
	@Autowired
	private MongoTransactionalService mongoTransService;
	
	public ProductQRInfo saveQRCode(ProductQRInfo qrInfo) {
		
		return mongoTemplate.insert(qrInfo);
	}
	
	public Product saveProductInfo(Product product) {
		
		return mongoTemplate.insert(product);
	}
	
	public Object saveTransObjects(List<Object> objects) {

		return mongoTransService.saveObjects(objects);
	}
	
	public Object saveObjects(Map<Object, String> products) {

		return mongoTransService.saveMapObjects(products);
	}
	
	public Product findProductById(String id) {
		
		return mongoTemplate.findById(id, Product.class, Constants.ProductCollection);
	}

	public ProductQRInfo findQRCodeById(String id) {
		
		return mongoTemplate.findById(id, ProductQRInfo.class, Constants.QRCollection);
	}
	
	public ProductQRInfo findQRCodeByName(String name) {
		
		Query query = new Query().addCriteria(Criteria.where("name").is(name));
		Product product = mongoTemplate.findOne(query, Product.class, Constants.ProductCollection);
		if(product!=null)
			return mongoTemplate.findById(product.getId(), ProductQRInfo.class, Constants.QRCollection);
		else
			return null;
	}
	
	public List<ProductInfo> findALLQRCodeInfo() {
		List<ProductInfo> info = new ArrayList<>();
		
		List<Product> products = mongoTemplate.findAll(Product.class, Constants.ProductCollection);
		products.forEach(prod->{
			ProductQRInfo qrCodes = mongoTemplate.findById(prod.getId(), 
					ProductQRInfo.class, Constants.QRCollection);
			info.add(new ProductInfo(prod.getId(), qrCodes.getQrBytes(), prod.getName(), 
					prod.getPrice(), prod.getDesc(), prod.getCode()));
		});
		return info;
	}
}
