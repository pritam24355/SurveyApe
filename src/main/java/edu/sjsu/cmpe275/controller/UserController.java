package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.dto.UserDto;
import edu.sjsu.cmpe275.error.UserAlreadyExistException;
import edu.sjsu.cmpe275.model.User;
import edu.sjsu.cmpe275.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.mail.internet.MimeMessage;
import javax.validation.Valid;

@RestController
public class UserController {

    @Autowired
    private JavaMailSender sender;

    @Autowired
    private UserServiceImpl userService;

    @GetMapping(path = "/user/signup")
    public String showRegistrationForm(WebRequest webRequest, Model model){
        UserDto userDto = new UserDto();
        model.addAttribute("user", userDto);
        return "Register a new user.";
    }

    @PostMapping(path = "/user/signup")
    public ModelAndView registerUserAccount(@ModelAttribute("user") @Valid UserDto accountDto, BindingResult result, WebRequest request, Errors errors){

        User newUser = new User();
        if (!result.hasErrors()){
            newUser = createUserAccount(accountDto, result);
//            return new ModelAndView("successRegister", "user", accountDto);
        }
        if (newUser == null){
            result.rejectValue("email", "message.regError");
//            return new ModelAndView("registration", "user", accountDto);
        }

        if(result.hasErrors()){
            return new ModelAndView("registration", "user", accountDto);
        } else {
            return new ModelAndView("successRegister", "user", accountDto);
        }
    }

    private User createUserAccount(UserDto accountDto, BindingResult result){

        User newUser = null;
        try {
            newUser = userService.registerNewUserAccount(accountDto);
        } catch (UserAlreadyExistException e){
            return null;
        }
        return newUser;
    }

    @GetMapping(path = "/user/login")
    public String showSigninForm(WebRequest webRequest, Model model){
        UserDto userDto = new UserDto();
        model.addAttribute("user", userDto);
        return "Sign in a user";
    }

    @PostMapping(path = "/user/login")
    public ModelAndView loginUser(@ModelAttribute("user") @Valid UserDto accountDto, BindingResult result, WebRequest request, Errors errors){

        User newUser = new User();
        if (!result.hasErrors()){
            newUser = loginUser(accountDto, result);
        }
        if (newUser == null){
            result.rejectValue("email", "message.regError");
//            return new ModelAndView("registration", "user", accountDto);
        }

        if(result.hasErrors()){
            return new ModelAndView("login", "user", accountDto);
        } else {
            return new ModelAndView("successLogin", "user", accountDto);
        }
    }

    private User loginUser(UserDto accountDto, BindingResult result){

        return null;
    }

    @PostMapping(path = "/sendMail")
    @ResponseBody
    String home(){
        try {
            sendMail();
            return "Email sent to the user.";
        } catch (Exception e){
            return "Error! Email not sent. Exception is: " +e;
        }
    }

    private void sendMail() throws Exception{

        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setTo("surveyape275@gmail.com");
        helper.setText("This is a test mail.");
        helper.setSubject("Test Mail.");

        sender.send(message);
    }



}
