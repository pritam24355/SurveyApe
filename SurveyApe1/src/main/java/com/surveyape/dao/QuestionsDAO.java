package com.surveyape.dao;

import com.surveyape.model.Questions;
import com.surveyape.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionsDAO extends JpaRepository<Questions,Integer> {
    List<Questions> findBySurveyId(Survey id);




}
