package com.surveyape.dao;

import com.surveyape.model.Survey;
import com.surveyape.model.SurveyAttendee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface SurveyAttendeeDAO extends JpaRepository<SurveyAttendee,Integer> {
List<SurveyAttendee> findByEmailId(String email);
SurveyAttendee findByEmailIdAndAndSurveyId(String email,Survey sur);

}