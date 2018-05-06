

package com.surveyape.model;

import javax.persistence.*;

@Entity
public class Answers {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="answerId")
	private Integer answerId;


	@ManyToOne
	@JoinColumn(name="surveyId")
	private Survey surveyId;
	 
	@ManyToOne
	@JoinColumn(name="questionId")
	private Questions questionId;
	

	@Column(name="userEmail")
	private String useremail;
	
	@Column(name="answer")
	private String answer;


	public Integer getAnswerId() {
		return answerId;
	}

	public void setAnswerId(Integer answerId) {
		this.answerId = answerId;
	}

	public Survey getSurveyId() {
		return surveyId;
	}

	public void setSurveyId(Survey surveyId) {
		this.surveyId = surveyId;
	}

	public Questions getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Questions questionId) {
		this.questionId = questionId;
	}

	public String getUseremail() {
		return useremail;
	}

	public void setUseremail(String useremail) {
		this.useremail = useremail;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}
}