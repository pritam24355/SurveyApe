package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.dto.UserDto;
import edu.sjsu.cmpe275.dto.error.BadRequestDto;
import edu.sjsu.cmpe275.dto.error.Response;
import edu.sjsu.cmpe275.model.User;
import edu.sjsu.cmpe275.repository.UserRepository;
import edu.sjsu.cmpe275.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Random;

@RestController
public class UserController {

    @Autowired
    private JavaMailSender sender;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private UserRepository userRepository;

    private User user;

    @PostMapping(path = "/user/signup", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {

        User user = null;
        Random random = new Random();
        int low = 100001;
        int high = 999999;

        int verificationToken = random.nextInt(high - low) + low;

        String toEmail = userDto.getEmail();
        String mailText = "Verification token for signing up at SurveyApe.";
        String mailSubject = "Verification token for signing up at SurveyApe is: '" + verificationToken + "' Please use this to sign up at SurveyApe.";
        try {
            user = createUserAccount(userDto, verificationToken);
            sendMail(toEmail, mailText, mailSubject);

        }catch (Exception e){

            BadRequestDto badRequestDto = new BadRequestDto(new Response(HttpStatus.BAD_REQUEST.toString(), e.getMessage()));
            return new ResponseEntity<BadRequestDto>(badRequestDto, HttpStatus.BAD_REQUEST);
        }

        return  new ResponseEntity<>(user, HttpStatus.OK);
    }

    private User createUserAccount(UserDto userDto, int verificationToken){

        User newUser = null;
        try {
            newUser = userService.registerNewUser(userDto, verificationToken);
        } catch (Exception e){
//            throw new UserAlreadyExistException("User with email '" + userDto.getEmail() + "' already exists");
            e.printStackTrace();
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

    @PostMapping(path = "/user/activate", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    public ResponseEntity<?> activateUser(@RequestParam String email, @RequestParam int verificationToken) {

        User newUser = null;
        try {
            newUser = userRepository.findByEmailAndVerificationToken(email, verificationToken);

            String toEmail = email;
            String mailText = "Welcome user. Your account is verified and you're ready to use SurveyApe.";
            String mailSubject = "User Verification is done.";

            newUser.setActive(true);
            userRepository.save(newUser);
            String message = "User is Activated.";

            sendMail(toEmail, mailSubject, mailText);

            return new ResponseEntity<Response>(new Response(HttpStatus.OK.toString(), message), HttpStatus.OK);
        } catch (Exception e) {

            String message = "Invalid email or verification code. Please try again.";
            Response badRequest = new Response(HttpStatus.BAD_REQUEST.toString(), message);
            BadRequestDto badRequestDto = new BadRequestDto(badRequest);

            return new ResponseEntity<BadRequestDto>(badRequestDto, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "/user/login", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    public ResponseEntity<?> loginUser(@RequestParam String email, @RequestParam String password, HttpSession session, HttpServletRequest request){
        try {
            //Clears the previous sessions
            session.invalidate();
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {

            User user = userRepository.findByEmailAndPassword(email, password);
            if(user != null) {
                if(user.isActive()) {

                    HttpSession newSession = request.getSession();
                    newSession.setAttribute("email", email);

                    String message = "User is logged in.";
                    return new ResponseEntity<Response>(new Response(HttpStatus.OK.toString(), message), HttpStatus.OK);
                } else {

                    String message = "User is not activated. Please activate the user and try again.";
                    Response badRequest = new Response(HttpStatus.BAD_REQUEST.toString(), message);
                    BadRequestDto badRequestDto = new BadRequestDto(badRequest);

                    return new ResponseEntity<BadRequestDto>(badRequestDto, HttpStatus.BAD_REQUEST);
                }
            } else {

                String message = "Invalid email or password. Please try again.";
                Response badRequest = new Response(HttpStatus.BAD_REQUEST.toString(), message);
                BadRequestDto badRequestDto = new BadRequestDto(badRequest);

                return new ResponseEntity<BadRequestDto>(badRequestDto, HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            e.printStackTrace();

            String message = "Invalid email or password. Please try again.";
            Response badRequest = new Response(HttpStatus.BAD_REQUEST.toString(), message);
            BadRequestDto badRequestDto = new BadRequestDto(badRequest);

            return new ResponseEntity<BadRequestDto>(badRequestDto, HttpStatus.BAD_REQUEST);
        }
    }

}
