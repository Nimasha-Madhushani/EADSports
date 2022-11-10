package com.example.SportsBlogApp.service;

import com.example.SportsBlogApp.entity.User;
import com.example.SportsBlogApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class AuthService {
    @Autowired
    private UserRepository userRepository;


    public User save(User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return userRepository.save(user);
    }

    public boolean isUserExists(User user) {
        boolean userExists = false;
        User existingUser = userRepository.findByUsername(user.getUsername());
        if(existingUser!=null){
            userExists = true;
        }
        return userExists;
    }

    public boolean verifyCredentials(User user) {
        boolean credentialsMatch = false;
        User existingUser = getUser(user);
//        User existingUser = userRepository.findByUsernamePassword(user.getEmail(), user.getPassword());
        if(new BCryptPasswordEncoder().matches(user.getPassword(), existingUser.getPassword())){
            credentialsMatch = true;
        }
        return credentialsMatch;
    }
    public User getUser(User user) {
        return userRepository.findByUsername(user.getUsername());
    }
}
