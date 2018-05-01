package com.surveyape.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.surveyape.model.User;
import com.surveyape.service.UserService;

import javax.servlet.http.HttpSession;

import java.io.File;


@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class SurveyController {
	@Autowired
    private UserService userService;
	
	
	
	
	@PostMapping(path="/register",consumes = MediaType.APPLICATION_JSON_VALUE ) 
    public  ResponseEntity<?> addNewUser (@RequestBody User user) {
		System.out.println(user.getEmail());
		System.out.println(user.getFirstName());

        userService.addUser(user);
        System.out.println("Saved");
        return new ResponseEntity(null,HttpStatus.CREATED);
    }

	
	
}
