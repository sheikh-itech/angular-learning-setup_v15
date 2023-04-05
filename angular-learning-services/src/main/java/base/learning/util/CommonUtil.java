package base.learning.util;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


@Component
public class CommonUtil {

	private static final Logger logger = LoggerFactory.getLogger(CommonUtil.class);
	
	private Set<String> optFields = new HashSet<>();
	private Set<String> totalKeys = new HashSet<>();
	
	public CommonUtil() {
		optFields.add("advRequestOn");
		optFields.add("advResponseOn");
		optFields.add("requestSentOn");
		optFields.add("responseSentOn");
		optFields.add("requestOn");
		optFields.add("responseOn");
	}
	
	/**
	 * @param bean object need to check for SQL Injection Possibility
	 * @return Map<String, String> holds method name and it's returned value<br />
	 *         If Returned Map is empty that means 'No Sql Injection' found
	 */
	public Map<String, String> validateInputObject(Object bean) {

		Map<String, String> outcome = new HashMap<>();
		
		validateInnerObjects(bean, outcome);
		if(outcome.size()>0)
			return outcome;
		
		checkSqlInjection(bean, outcome);

		return outcome;
	}

	public Set<String> allKeysExist(Set<String> keys) {

		if(this.totalKeys.size()==keys.size() && this.totalKeys.containsAll(keys))
			return new HashSet<String>();
		else{
			/*
			totalKeys.removeAll(keys);
			Set<String> outcome = totalKeys.stream().map(String::new).collect(Collectors.toSet());
			totalKeys.clear();
			this.initKeys();
			return outcome;
			*/
			keys.removeAll(totalKeys);
			return keys;
		}
	}
	
	private void validateInnerObjects(Object bean, Map<String, String> outcome) {
		
		if(bean==null) {
			outcome.put("uses", null);
			return;
		}
	}
	
	private void validateFields(String fieldName, Object fieldValue, Map<String, String> outcome) {
		
		if(fieldValue==null && optFields.contains(fieldName))
			return;
		else if(fieldValue==null) {
			outcome.put(fieldName, fieldName);
			return;
		}
		
		String value = fieldValue.toString().trim();
		
		if(fieldName.startsWith("key1") && (!(value.length()==18 || value.isEmpty()) || !alphaNumeric(value)))
			outcome.put("key1", "missing key");
		if (fieldName.startsWith("key2") && !((value.length()<=10 && value.length()>=0) || !alphaNumeric(value)))
			outcome.put("key2", "missing key");
		if (fieldName.startsWith("value1") && !((value.length()<=10 && value.length()>=0) || !alphaNumeric(value)))
			outcome.put("value1", "value1");
	}
	
	private boolean alphaNumeric(String text) {
		
		if("".equals(text))
			return true;
		
		return text.matches("^[\\pL\\pN]+$");
	}
	
	private boolean validAlphaNum(String text) {
		
		if("".equals(text))
			return true;
		
		return text.matches("^[\\pL\\pN\\.\\:\\_]+$");
	}
	
	private void checkSqlInjection(Object bean, Map<String, String> outcome) {

		try {

			if (bean == null)
				return;

			Method[] a = bean.getClass().getMethods();
			for (Method method : a) {

				if (isGetter(method)) {
					
					if (chechReturnType(method.getReturnType().getName()))
						checkSqlInjection(method.invoke(bean), outcome);

					Object value = method.invoke(bean);

					String field = null;
					if (method.getName().startsWith("get"))
						field = method.getName().substring(3);
					else if (method.getName().startsWith("is"))
						field = method.getName().substring(2);
					else
						continue;
					
					field = StringUtils.uncapitalize(field);
					
					validateFields(field, value, outcome);
					
					if (value!=null && isSQLInjection(value) && validAlphaNum(value.toString()))
						outcome.put(field, "Sql Injection Possibility");
				}
			}
		} catch (Exception ex) {
			logger.error("Sql Injection Check error, "+ex.getMessage());
		}
	}

	private boolean chechReturnType(String name) {

		return name.startsWith("com");
	}

	private boolean isGetter(Method method) {

		if (method.getName().startsWith("get") || method.getName().startsWith("is"))
			return true;

		return false;
	}

	private boolean isSQLInjection(Object object) {

		String REGEX = "\\s*and\\s*|\\s*or\\s*|\\s*between\\*+|\\s*union\\s*|\\s*join\\s*|\\s*sleep\\s*|\\s*shutdown\\s*|\\s*select\\s*|\\s*drop\\s*|\\s*delete\\s*|[\\(\\)<>;'\"`#=%*]|[-]{2,}/i";
		Pattern p = Pattern.compile(REGEX);
		Matcher m = p.matcher(object.toString().trim().toLowerCase());

		if (m.matches())
			return true;
		else
			return false;
	}
}
