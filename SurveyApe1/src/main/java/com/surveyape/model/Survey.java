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

        @Column(name="openurl")
    private String openurl;

    @Column(name="isUnique")
    private String isUnique;

    @OneToMany(mappedBy = "surveyId", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<SurveyAttendee> surveyattendee;

    @ManyToOne
    @JoinColumn(name = "userEmail")
    private User email;

        @OneToMany(mappedBy = "surveyId", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
        private List<Questions> questionList=new ArrayList<Questions>();




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

    public List<SurveyAttendee> getSurveyattendee() {
        return surveyattendee;
    }

    public void setSurveyattendee(List<SurveyAttendee> surveyattendee) {
        this.surveyattendee = surveyattendee;
    }


    public String getOpenurl() {
        return openurl;
    }

    public void setOpenurl(String openurl) {
        this.openurl = openurl;
    }


    public String getIsUnique() {
        return isUnique;
    }

    public void setIsUnique(String isUnique) {
        this.isUnique = isUnique;
    }
}

