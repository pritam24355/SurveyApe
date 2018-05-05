package com.surveyape.model;




import javax.persistence.*;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

    @Entity
    public class Options {

        @Id
        @GeneratedValue(strategy=GenerationType.AUTO)
        @Column(name="optionId")
        private Integer optionId;

        @Column(name="questionId")
        private Integer questionId;

        @Column(name="surveyId")
        private Integer surveyId;

        @Column(name="otions")
        private String options;


        public Integer getOptionId() {
            return optionId;
        }

        public void setOptionId(Integer optionId) {
            this.optionId = optionId;
        }

        public Integer getQuestionId() {
            return questionId;
        }

        public void setQuestionId(Integer questionId) {
            this.questionId = questionId;
        }

        public Integer getSurveyId() {
            return surveyId;
        }

        public void setSurveyId(Integer surveyId) {
            this.surveyId = surveyId;
        }

        public String getOptions() {
            return options;
        }

        public void setOptions(String options) {
            this.options = options;
        }
    }
