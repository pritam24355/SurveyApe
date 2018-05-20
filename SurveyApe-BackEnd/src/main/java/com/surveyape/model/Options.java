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

        @ManyToOne
        @JoinColumn(name = "questionId")
        private Questions questionId;


        @Column(name="options")
        private String options;


        public Integer getOptionId() {
            return optionId;
        }

        public void setOptionId(Integer optionId) {
            this.optionId = optionId;
        }

        public Questions getQuestionId() {
            return questionId;
        }

        public void setQuestionId(Questions questionId) {
            this.questionId = questionId;
        }

        public String getOptions() {
            return options;
        }

        public void setOptions(String options) {
            this.options = options;
        }
    }
