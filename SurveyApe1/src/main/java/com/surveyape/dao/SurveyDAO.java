package com.surveyape.dao;

import com.surveyape.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SurveyDAO extends JpaRepository<Survey,Integer> {
        Survey findSurveysBySurveyName(String surveyname);
        List<Survey> findAll();

}