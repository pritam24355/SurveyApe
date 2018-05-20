

package com.surveyape.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Answers {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="answerId")
	private Integer answerId;



	 
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name="questionId")
	private Questions questionId;
	


	
	@Column(name="answer")
	private String answer;


	public Integer getAnswerId() {
		return answerId;
	}

	public void setAnswerId(Integer answerId) {
		this.answerId = answerId;
	}



	public Questions getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Questions questionId) {
		this.questionId = questionId;
	}



	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}
}