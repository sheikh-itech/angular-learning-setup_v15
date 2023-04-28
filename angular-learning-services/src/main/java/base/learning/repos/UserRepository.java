package base.learning.repos;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import base.learning.beans.User;

@Repository
public interface UserRepository extends MongoRepository<User, Integer> {

}
