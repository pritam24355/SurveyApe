package com.surveyape.controller;

//import com.fasterxml.jackson.databind.ObjectMapper;
import com.surveyape.model.*;
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

import com.surveyape.service.UserService;

        import javax.servlet.http.HttpSession;

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

    TTestTypeURL_URLGenerator tt = new TTestTypeURL_URLGenerator();
    // String url= tt.GetURL();


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
            if (strver.equals("null")) {
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
            String email = reqObj.getString("username");
            //String email = "shripal555@gmail.com";
            String reguser = reqObj.getString("inputemail");
            String[] parts = reguser.split(",");
            int len = parts.length;
            System.out.println(len);
            for (int i = 0; i < len; i++) {
                String url = parts[i];
                System.out.println(url);

            }

            System.out.println(parts);
            JSONArray questionArray = reqObj.getJSONArray("questionsarray");
            Survey s1 = new Survey();
            User userVO = userService.finduserById(email);
            s1.setEmail(userVO);
            s1.setSurveyName(surveyTitle);
            Survey surveyinfo = userService.setsurveyinfo(s1);


            for (String s : parts) {
                //Do your stuff here
                String url = tt.GetURL(s);
                Boolean isValid = true;
                SurveyAttendee sat = new SurveyAttendee();
                sat.setEmailId(s);
                sat.setSurveyId(surveyinfo);
                sat.setSurveyUrl(url);
                sat.setValid(isValid);
                System.out.println("**************************************");
                SurveyAttendee att = userService.addattendee(sat);
                System.out.println(att.getAttendeeId());

            }
            for (int i = 0; i < questionArray.length(); i++) {
                JSONObject questionOnj = questionArray.getJSONObject(i);
                String questionText = questionOnj.getString("question");
                String questionType = questionOnj.getString("type");
                Questions idof = new Questions();
                idof.getSurveyId();
                Questions questof = userService.submitquestions(surveyinfo, questionText, questionType);
                System.out.println(questof);

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

        } catch (RuntimeException e) {
            throw e;
        }

    }


    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> userlogin(@RequestBody String json, HttpSession session) throws IOException {
        try {

            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> details;
            details = mapper.readValue(json, HashMap.class);
            String email = details.get("inputUsername");
            String password = details.get("inputPassword");
            User user1 = userService.loginaccount(email, password);
            System.out.println("inside login");

            System.out.println(user1.getEmail());

            session.setAttribute("name", user1.getEmail());

            return new ResponseEntity(user1, HttpStatus.OK);

        } catch (RuntimeException e) {
            throw e;
        }

    }

    @GetMapping(path = "/checksession", consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    ResponseEntity<?> usersession(HttpSession session) throws IOException {
        try {

            String email = String.valueOf(session.getAttribute("name"));
            if (email.equals("null")) {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }

            User user1 = userService.loginaccountforsession(email);

            return new ResponseEntity(user1, HttpStatus.OK);
            /*//System.out.println(email);
                System.out.println("inside checksession");
            System.out.println(session.getAttribute("name"));*/
            //return new ResponseEntity<Object>(email, HttpStatus.OK);

        } catch (RuntimeException e) {
            throw e;
        }

    }


    @PostMapping(path = "/getsurvey", consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    Iterable<Questions> getsurvey() throws IOException {
        try {
            String surveytit = "Survey1";
            Survey info = userService.findsurveyByTitle(surveytit);
            return userService.findQuestionsbySurveyId(info);

        } catch (RuntimeException e) {
            throw e;
        }
    }

    @DeleteMapping(path = "/logout", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(HttpSession session) throws IOException {
        try {
            session.invalidate();
            return new ResponseEntity(HttpStatus.OK);

        } catch (RuntimeException e) {
            throw e;
        }
    }


    @PostMapping(path = "/dogetSurveyTitle", consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    ResponseEntity getsurveytitles(HttpSession session) throws IOException {
        try {
            String email = (String) session.getAttribute("name");
            SurveyAttendee surveyatt = userService.getsurveyidfromatt(email);
            Survey sur = new Survey();
           List<Survey> suroo= userService.findsurveybyId(surveyatt);
           System.out.println("**************");


            return new ResponseEntity(suroo,HttpStatus.OK);


        } catch (RuntimeException e) {
            throw e;
        }
    }


    /*@DeleteMapping(path = "/logout", consumes = MediaType.APPLICATION_JSON_VALUE)
    public  ResponseEntity<?> delete(HttpSession session) throws IOException {
        try {
            session.invalidate();
            return new ResponseEntity(HttpStatus.OK);

        }
        catch (RuntimeException e){
            throw e;
        }
    }*/

















    @PostMapping(path = "/submitanswers", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> submitanswers(@RequestBody String json, HttpSession session) throws IOException {
        try {
            System.out.println(json.getClass());
            ObjectMapper mapper = new ObjectMapper();
            Map<Integer, String> details;
            details = mapper.readValue(json, HashMap.class);

            Iterator it = details.entrySet().iterator();
            while (it.hasNext()) {
                Map.Entry pair = (Map.Entry)it.next();
                System.out.println(pair.getKey() + " = " + pair.getValue());
                Answers ans=new Answers();
                Questions quet=new Questions();
                int intvalue=Integer.parseInt((String) pair.getKey());
                quet.setQuestionId(intvalue);
                ans.setQuestionId(quet);
                ans.setAnswer((String) pair.getValue());
                Answers ans1=userService.submitanswer(ans);
            }


            return new ResponseEntity( HttpStatus.OK);

        } catch (RuntimeException e) {
            throw e;
        }

    }




}