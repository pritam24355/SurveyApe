package com.surveyape.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.surveyape.dao.UserDAO;
import com.surveyape.model.User;

@Service
public class UserService {

	@Autowired
    private UserDAO userdao;
	
	
	 public void addUser(User user) {
	        userdao.save(user);
	
	
	
}
}