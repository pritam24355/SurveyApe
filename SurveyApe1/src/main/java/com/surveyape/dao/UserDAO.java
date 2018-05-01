package com.surveyape.dao;

import org.springframework.data.repository.CrudRepository;

import com.surveyape.model.User;
public interface UserDAO extends CrudRepository<User,String>{

}
