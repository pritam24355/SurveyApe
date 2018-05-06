package com.surveyape.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

	@JsonIgnore
	@ManyToOne
    @JoinColumn(name = "survey_id")
    private Survey surveyId;

    @OneToMany(mappedBy = "questionId", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    private List<Options> questionOptionList=new ArrayList<Options>();

    @OneToMany(mappedBy = "questionId", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<Answers> questionResponseList;


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

    public Survey getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(Survey surveyId) {
        this.surveyId = surveyId;
    }

    public List<Options> getQuestionOptionList() {
        return questionOptionList;
    }

    public void setQuestionOptionList(List<Options> questionOptionList) {
        this.questionOptionList = questionOptionList;
    }

    public List<Answers> getQuestionResponseList() {
        return questionResponseList;
    }

    public void setQuestionResponseList(List<Answers> questionResponseList) {
        this.questionResponseList = questionResponseList;
    }
}