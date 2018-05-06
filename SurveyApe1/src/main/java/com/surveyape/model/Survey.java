package com.surveyape.model;

import javax.persistence.*;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Entity
    public class Survey {

        @Id
        @GeneratedValue(strategy=GenerationType.AUTO)
        @Column(name="surveyId")
        private Integer surveyId;

        @Column(name="surveyName")
        private String surveyName;

    @ManyToOne
    @JoinColumn(name = "userEmail")
    private User email;

        @OneToMany(mappedBy = "surveyId", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
        private List<Questions> questionList=new ArrayList<Questions>();

    @OneToMany(mappedBy = "surveyId", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<Answers> responseList;


    public Integer getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(Integer surveyId) {
        this.surveyId = surveyId;
    }

    public String getSurveyName() {
        return surveyName;
    }

    public void setSurveyName(String surveyName) {
        this.surveyName = surveyName;
    }

    public User getEmail() {
        return email;
    }

    public void setEmail(User email) {
        this.email = email;
    }

    public List<Questions> getQuestionList() {
        return questionList;
    }

    public void setQuestionList(List<Questions> questionList) {
        this.questionList = questionList;
    }

    public List<Answers> getResponseList() {
        return responseList;
    }

    public void setResponseList(List<Answers> responseList) {
        this.responseList = responseList;
    }
}

