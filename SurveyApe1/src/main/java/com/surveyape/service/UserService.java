package com.surveyape.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.surveyape.dao.*;
import com.surveyape.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.*;

@Service
public class UserService {

	@Autowired
	SurveyAttendeeDAO surveyAttendeeDAO;


	@Autowired
	private AnswersDAO answersDAO;

	@Autowired
	private SurveyDAO surveyDAO;
	@Autowired
	private UserDAO userdao;

	@Autowired
	private QuestionsDAO questionsdao;

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
		System.out.println(userdao.findByEmailAndPassword(email,password));

		return userdao.findByEmailAndPassword(email,password);
		/*ObjectMapper mapperObj = new ObjectMapper();
		String str = mapperObj.writeValueAsString(user1);*/
        //return str;
    }
	public SurveyAttendee addattendee(SurveyAttendee att) throws JsonProcessingException {


		return surveyAttendeeDAO.save(att);

	}

	public List<SurveyAttendee> getsurveyidfromatt(String email) throws JsonProcessingException {
		return surveyAttendeeDAO.findByEmailId(email);

	}
	public Survey findsurveybyId(Integer sur) throws JsonProcessingException {
		return surveyDAO.findBySurveyId(sur);

	}

    public Questions submitquestions(Survey idof,String questionText,String questionType){
		ObjectMapper mapper = new ObjectMapper();
		Questions que=new Questions();
		que.setSurveyId(idof);
		que.setQuestionName(questionText);
		que.setQuestionType(questionType);
		return questionsdao.save(que);


	}
	public User finduserById(String email) throws JsonProcessingException {
		return userdao.findOne(email);
	}
	public Survey setsurveyinfo(Survey s1){
		return surveyDAO.save(s1);

	}
	public Survey findsurveyByTitle(Integer title){
	   return surveyDAO.findOne(title);

    }

    public Iterable<Questions> findQuestionsbySurveyId(Survey survey){
		//List<Questions> questions = questionsdao.findBySurveyId(survey);

		//JSONObject responseDetailsJson = new JSONObject();
		//JSONArray jsonArray = new JSONArray();
		//System.out.println(questions.get(0));
		//String count="0";
		//Iterator iter = questions.iterator();
		//while (iter.hasNext()) {
		//	responseDetailsJson.put(count,iter.hasNext());
		//	System.out.println(responseDetailsJson);




		//JSONObject reqObj = new JSONObject(mainList);
		//System.out.println(reqObj.getJSONArray("questionid"));
		//System.out.println(quesur);
		//String email = reqObj.getString("username");
		String email = "shripal555@gmail.com";
		/*JSONArray questionArray = reqObj.getJSONArray("questionsarray");
		System.out.println(mainList);*/
		ObjectMapper mapper = new ObjectMapper();
		Map<String, String> title;
		//title = mapper.readValue(mainList, HashMap.class);
		return questionsdao.findBySurveyId(survey);
    }

	public Answers submitanswer(Answers s1){
		return answersDAO.save(s1);

	}
	public User loginaccountforsession(String email){
		return userdao.findByEmail(email);

	}


}