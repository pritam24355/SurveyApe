package com.surveyape.dao;

import com.surveyape.model.Survey;
import com.surveyape.model.SurveyAttendee;
import com.surveyape.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SurveyDAO extends JpaRepository<Survey,Integer> {
        Survey findSurveysBySurveyName(String surveyname);
        List<Survey> findAll();
        Survey findBySurveyId(Integer natt);
        List<Survey> findByOpenurlNotNull();
        List<Survey> findByIsUniqueNotNull();
        List<Survey> findAllByEmail(User email);

}