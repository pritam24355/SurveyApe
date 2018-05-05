package com.surveyape.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.apache.bcel.classfile.Code;
import org.aspectj.weaver.patterns.TypePatternQuestions;
import com.fasterxml.jackson.databind.ObjectMapper;


import org.json.JSONArray;
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
import com.surveyape.model.Questions;

import com.surveyape.service.UserService;

import javax.servlet.http.HttpSession;

import java.io.File;
import java.io.IOException;
import java.util.*;



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
    @PostMapping(path = "/submitsurvey", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> submitsurvey(@RequestBody String json, HttpSession session) throws IOException {
        try {

            JSONObject reqObj = new JSONObject(json);
            String surveyTitle = reqObj.getString("Title");
            JSONArray questionArray = reqObj.getJSONArray("questionsarray");
            for (int i = 0; i < questionArray.length(); i++) {
                JSONObject questionOnj = questionArray.getJSONObject(i);
                String questionText = questionOnj.getString("question");
                String questionType = questionOnj.getString("type");
                String quest = userService.submitquestions(questionText, questionType);





            }


/*





                ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> details;

            details = mapper.readValue(json, HashMap.class);
            System.out.println(details);
           *//* Questionpojo questionpojo1= mapper.readValue(json,Questionpojo.class);
            System.out.println(questionpojo1);*//*
            // System.out.println(details.get("Title"));
            //System.out.println();
            ArrayList mainList = (ArrayList) details.get("questionsarray");
            String roleListData= mapper.writeValueAsString(details.get("questionsarray"));
            System.out.println(roleListData);
            //Questionpojo quepojo=mapper.writeValue(,Questionpojo);
            Gson gson = new Gson();
            String json = gson.toJson(mainList);
            System.out.println(json);
           *//* return json;
            String json1 = new Gson().toJson(mainList);*//*


            // Questionpojo questionpojo1= mapper.readValue(,Questionpojo.class);
            //System.out.println(questionpojo1.getQuestiontype());
             System.out.println(mainList.getClass());
            //  System.out.println(mainList.get(0).getClass());
            Iterator<LinkedHashMap> itr = mainList.iterator();
            while (itr.hasNext()) {
                LinkedHashMap innerList = itr.next();
                Set<String> keys = innerList.keySet();
                for(String k:keys){
                    System.out.println(k+" -- "+innerList.get(k));
                }
                //Iterator<LinkedHashMap> itrinner = innerList.forEach();
               System.out.println(itr.next());

                //System.out.println(itrinner.next());
            }
*//*
            Map<String, String> quedetail;

            quedetail = mapper.readValue(mainList.get(0),HashMap.class);
*//*

                // List<> questionpojoList= new ArrayList<Questionpojo>();
                //questionpojoList=details.get("questionsarray");
                //System.out.println(questionpojoList);
                //    List<HashMap> questiondetails = mapper.readValue(details.get("questionarray"), List.class);
                // System.out.println(questiondetails);*/

                return new ResponseEntity(HttpStatus.OK);

            } catch(RuntimeException e){
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