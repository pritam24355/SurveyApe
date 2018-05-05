package com.surveyape.model;

import javax.persistence.*;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

    @Entity
    public class Survey {
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

        public Integer getUserId() {
            return userId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }

        @Id
        @GeneratedValue(strategy=GenerationType.AUTO)
        @Column(name="surveyId")
        private Integer surveyId;

        @Column(name="surveyName")
        private String surveyName;

        @Column(name="userId")
        private Integer userId;




    }

