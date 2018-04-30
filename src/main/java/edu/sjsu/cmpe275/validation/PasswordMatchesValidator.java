package edu.sjsu.cmpe275.validation;

import edu.sjsu.cmpe275.dto.UserDto;
import edu.sjsu.cmpe275.model.User;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {
    @Override
    public void initialize(PasswordMatches constraintAnnotation) {

    }

    @Override
    public boolean isValid(Object object, ConstraintValidatorContext context) {

        UserDto user = (UserDto) object;
        return user.getPassword().equals(user.getConfirmPassword());
    }
}
