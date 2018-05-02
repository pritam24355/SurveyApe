package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.dto.UserDto;
import edu.sjsu.cmpe275.dto.error.BadRequestDto;
import edu.sjsu.cmpe275.dto.error.Response;
import edu.sjsu.cmpe275.exception.UserAlreadyExistException;
import edu.sjsu.cmpe275.model.User;
import edu.sjsu.cmpe275.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import javax.mail.internet.MimeMessage;

@RestController
public class UserController {

    @Autowired
    private JavaMailSender sender;

    @Autowired
    private UserServiceImpl userService;

//    @GetMapping(path = "/user/signup")
//    public String showRegistrationForm(WebRequest webRequest, Model model){
//        UserDto userDto = new UserDto();
//        model.addAttribute("user", userDto);
//        return "Register a new user.";
//    }

    @PostMapping(path = "/user/signup", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {

        User user = null;
        String toEmail = userDto.getEmail();
        String mailText = "Testing token for mail signup";
        String mailSubject = "Verification token for signing up at SurveyApe";
        try {
            user = createUserAccount(userDto);
            sendMail(toEmail, mailText, mailSubject);

        }catch (Exception e){

            BadRequestDto badRequestDto = new BadRequestDto(new Response(HttpStatus.BAD_REQUEST.toString(), e.getMessage()));
            return new ResponseEntity<BadRequestDto>(badRequestDto, HttpStatus.BAD_REQUEST);
        }

        return  new ResponseEntity<>(user, HttpStatus.OK);
    }

    private User createUserAccount(UserDto userDto){

        User newUser = null;
        try {
            newUser = userService.registerNewUser(userDto);
        } catch (UserAlreadyExistException e){
            throw new UserAlreadyExistException("User with email '" + userDto.getEmail() + "' already exists");
        }
        return newUser;
    }

    private void sendMail(String toMail, String subject, String text) throws Exception{

        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("surveyape275@gmail.com");
        helper.setTo(toMail);
        helper.setText(text);
        helper.setSubject(subject);

        sender.send(message);
    }



}
