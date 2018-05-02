package edu.sjsu.cmpe275.dto.error;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BadRequestDto {

    @JsonProperty("Bad Request")
    public Response badRequest;

    public BadRequestDto(Response badRequest) {
        this.badRequest = badRequest;
    }

    public Response getBadRequest() {
        return badRequest;
    }

    public void setBadRequest(Response badRequest) {
        this.badRequest = badRequest;
    }
}
