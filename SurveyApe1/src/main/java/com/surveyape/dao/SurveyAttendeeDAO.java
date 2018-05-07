package com.surveyape.dao;

import com.surveyape.model.SurveyAttendee;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SurveyAttendeeDAO extends JpaRepository<SurveyAttendee,Integer> {
SurveyAttendee findByEmailId(String email);

}