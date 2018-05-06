package com.surveyape.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.surveyape.dao.QuestionsDAO;
import com.surveyape.dao.SurveyDAO;
import com.surveyape.model.Questions;
import com.surveyape.model.Survey;
import org.json.JSONArray;
import org.json.JSONObject;
import org.omg.PortableInterceptor.SYSTEM_EXCEPTION;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.surveyape.dao.UserDAO;
import com.surveyape.model.User;

import java.util.*;

@Service
public class UserService {


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
	public Survey findsurveyByTitle(String title){
	   return surveyDAO.findSurveysBySurveyName(title);

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



}