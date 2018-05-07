package com.surveyape.model;



        import javax.persistence.Column;
        import javax.persistence.Entity;
        import javax.persistence.GeneratedValue;
        import javax.persistence.GenerationType;
        import javax.persistence.Id;
        import javax.persistence.JoinColumn;
        import javax.persistence.ManyToOne;

        import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class SurveyAttendee {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name="attendeeId")
    private Integer attendeeId;

    @Column(name="emailId")
    private String emailId;

    @Column(name="surveyUrl")
    private String surveyUrl;

    @Column(name="isValid")
    private boolean isValid;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "survey_id")
    private Survey surveyId;


    public Integer getAttendeeId() {
        return attendeeId;
    }

    public void setAttendeeId(Integer attendeeId) {
        this.attendeeId = attendeeId;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getSurveyUrl() {
        return surveyUrl;
    }

    public void setSurveyUrl(String surveyUrl) {
        this.surveyUrl = surveyUrl;
    }

    public boolean isValid() {
        return isValid;
    }

    public void setValid(boolean valid) {
        isValid = valid;
    }

    public Survey getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(Survey surveyId) {
        this.surveyId = surveyId;
    }
}