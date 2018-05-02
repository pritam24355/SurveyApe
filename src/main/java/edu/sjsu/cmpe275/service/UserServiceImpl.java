package edu.sjsu.cmpe275.service;

import edu.sjsu.cmpe275.dto.UserDto;
import edu.sjsu.cmpe275.exception.UserAlreadyExistException;
import edu.sjsu.cmpe275.model.User;
import edu.sjsu.cmpe275.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@Component
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    @Override
    public User registerNewUser(UserDto userDto) {

        final User user = new User();

        if (emailExist(userDto.getEmail())) {
            throw new UserAlreadyExistException("An account already exists with this email. Please use a new Email address" + userDto.getEmail());
        } else {

            user.setFirstName(userDto.getFirstName());
            user.setLastName(userDto.getLastName());
            user.setEmail(userDto.getEmail());
            user.setAge(userDto.getAge());
            user.setGender(userDto.getGender());
            user.setPhone(userDto.getPhone());

            return userRepository.save(user);
        }

    }

    private boolean emailExist(String email){

        User user = userRepository.findByEmail(email);
        if(user != null){
            return true;
        }
            return false;
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> getUserById(long id) {
        return userRepository.findById(id);
    }
}
