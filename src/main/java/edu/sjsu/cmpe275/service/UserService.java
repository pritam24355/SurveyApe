package edu.sjsu.cmpe275.service;

import edu.sjsu.cmpe275.dto.UserDto;
import edu.sjsu.cmpe275.exception.UserAlreadyExistException;
import edu.sjsu.cmpe275.model.User;

import java.util.Optional;

public interface UserService {

    User registerNewUser(UserDto accountDto, int verificationToken) throws UserAlreadyExistException;

    Optional<User> getUserById(long id);
}
