package com.surveyape.controller;


import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Questionpojo {
    String type;
    String question;


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
