package com.surveyape.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Questions {
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name="questionId")
	private Integer questionId;
	
	@Column(name="questionType")
	private String questionType;
	
	@Column(name="questionName")
	private String questionName;
	
	@Column(name="surveyId")
	private Integer surveyId;
	
	@Column(name="userId")
	private Integer userId;

	public Integer getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}

	public String getQuestionType() {
		return questionType;
	}

	public void setQuestionType(String questionType) {
		this.questionType = questionType;
	}

	public String getQuestionName() {
		return questionName;
	}

	public void setQuestionName(String questionName) {
		this.questionName = questionName;
	}

	public Integer getSurveyId() {
		return surveyId;
	}

	public void setSurveyId(Integer surveyId) {
		this.surveyId = surveyId;
	}

	
	
}