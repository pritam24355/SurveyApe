package edu.sjsu.cmpe275.service;

import edu.sjsu.cmpe275.dto.UserDto;
import edu.sjsu.cmpe275.error.UserAlreadyExistException;
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
    public User registerNewUserAccount(UserDto accountDto) {

        final User user = new User();

        if (emailExist(accountDto.getEmail())) {
            throw new UserAlreadyExistException("An account already exists with this email. Please use a new Email address" + accountDto.getEmail());
        } else {

            user.setFirstName(accountDto.getFirstName());
            user.setLastName(accountDto.getLastName());
            user.setEmail(accountDto.getEmail());
            user.setAge(accountDto.getAge());
            user.setGender(accountDto.getGender());
            user.setPhone(accountDto.getPhone());

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
