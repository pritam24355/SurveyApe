package com.surveyape.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.surveyape.model.User;
public interface UserDAO extends JpaRepository<User,Integer> {

    User findByCodeEquals(Integer code);
    User findByEmailAndPassword(String email,String password);

}
