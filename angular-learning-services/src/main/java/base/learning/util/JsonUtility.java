package base.learning.util;

import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

@Component
public class JsonUtility {

	public void resolveKeys(String body, List<String> keys, ObjectMapper mapper)
			throws JsonMappingException, JsonProcessingException {

		JsonNode jsonNode = mapper.readTree(body);
		getAllNestedFields(jsonNode, keys);
	}

	private void getAllNestedFields(JsonNode jsonNode, List<String> keys) {

		if (jsonNode.isObject()) {
			Iterator<Entry<String, JsonNode>> fields = jsonNode.fields();
			fields.forEachRemaining(field -> {
				keys.add(field.getKey());
				getAllNestedFields((JsonNode) field.getValue(), keys);
			});
		} else if (jsonNode.isArray()) {
			ArrayNode arrayField = (ArrayNode) jsonNode;
			arrayField.forEach(node -> {
				getAllNestedFields(node, keys);
			});
		}
	}
}
