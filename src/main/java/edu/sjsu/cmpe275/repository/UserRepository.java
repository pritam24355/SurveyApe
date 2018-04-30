package edu.sjsu.cmpe275.repository;

import edu.sjsu.cmpe275.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{

    User findByEmail(String email);
}
