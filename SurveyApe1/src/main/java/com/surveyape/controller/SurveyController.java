package com.surveyape.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.apache.bcel.classfile.Code;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.surveyape.model.User;
import com.surveyape.service.UserService;

import javax.servlet.http.HttpSession;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;


@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class SurveyController {
    @Autowired
    private UserService userService;

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendMail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        javaMailSender.send(message);
    }

    public static int generateRandomInt(int upperRange) {
        Random random = new Random();
        return random.nextInt(upperRange);
    }


    @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewUser(@RequestBody User user) {
        System.out.println(user.getEmail());
        System.out.println(user.getFirstName());
        Random random = new Random();
        int code = random.nextInt(9999);
        user.setCode(code);
        userService.addUser(user);
        System.out.println("Saved");
        sendMail(user.getEmail(), "verification", "Code:" + user.getCode());
        return new ResponseEntity(null, HttpStatus.CREATED);
    }

    @PostMapping(path = "/verifycode", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> verificationofuser(@RequestBody String json) throws IOException {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> ids;
            ids = mapper.readValue(json, HashMap.class);
            String idRoleString = ids.get("code");

            int idRole = Integer.parseInt(idRoleString);
            System.out.println(idRole);
            User user2 = userService.verifyUser(idRole);
            String strver = mapper.writeValueAsString(user2);
            System.out.println(strver);
            if(strver.equals("null")){
                return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
            }

           /* if (verifieduser.equals("null")) {
                return new ResponseEntity(null, HttpStatus.NOT_FOUND);
            }*/
            return new ResponseEntity(user2, HttpStatus.OK);

        } catch (RuntimeException e) {
            throw e;
        }

    }
    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> userlogin(@RequestBody String json, HttpSession session) throws IOException {
        try {

            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> details;
            details = mapper.readValue(json,HashMap.class);
            String email = details.get("inputUsername");
            String password = details.get("inputPassword");
            User user1=userService.loginaccount(email, password);

            return new ResponseEntity(user1,HttpStatus.OK);

        } catch (RuntimeException e) {
            throw e;
        }

    }
}