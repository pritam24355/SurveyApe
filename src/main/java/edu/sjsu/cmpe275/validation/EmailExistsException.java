package edu.sjsu.cmpe275.validation;

@SuppressWarnings("serial")
public class EmailExistsException extends Throwable {

    public EmailExistsException(final String message){
        super(message);
    }
}
