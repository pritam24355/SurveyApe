package com.surveyape.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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


	public User verifyUser(Integer user) throws JsonProcessingException {
		System.out.println(user.getClass());
		ObjectMapper mapperObj = new ObjectMapper();
		return userdao.findByCodeEquals(user);
		//User user1 = userdao.findByCodeEquals(user);
		//String str = mapperObj.writeValueAsString(user1);
		//return str;


	}
	public User loginaccount(String email, String password) throws JsonProcessingException {
	    return userdao.findByEmailAndPassword(email,password);
		/*ObjectMapper mapperObj = new ObjectMapper();
		String str = mapperObj.writeValueAsString(user1);*/



        //return str;
    }



}