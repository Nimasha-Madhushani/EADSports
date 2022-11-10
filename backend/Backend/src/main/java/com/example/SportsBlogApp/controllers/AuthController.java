package com.example.SportsBlogApp.controllers;

import com.example.SportsBlogApp.Utils.JwtUtils;
import com.example.SportsBlogApp.Utils.PublicUser;
import com.example.SportsBlogApp.entity.User;
import com.example.SportsBlogApp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private JwtUtils jwtUtils;

    private PublicUser publicUser;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<Map> userRegister(@RequestBody User user) {
        System.out.println(user);
        System.out.println(user.getEmail());
        HashMap<String, Object> response = new HashMap<>();
        if (authService.isUserExists(user)) {
            response.put("success", "false");
            response.put("message", "This email has already registered");
            return ResponseEntity.status(400).body(response);
        }
        authService.save(user);
        response.put("success", "true");
        response.put("message", "User successfully registered");
        return ResponseEntity.ok().body(response);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<Map> generateToken(@RequestBody User user) throws Exception {
        try {
            System.out.println(user.getUsername());
            System.out.println(user.getPassword());
            HashMap<String, Object> response = new HashMap<>();
            if (!authService.isUserExists(user)) {
                response.put("success", "false");
                response.put("message", "This account is not found");
                return ResponseEntity.status(400).body(response);
            }
            if (authService.verifyCredentials(user)) {
                User existingUser = authService.getUser(user);

                String token = jwtUtils.generateToken(user.getUsername());

                PublicUser loggedUser = new PublicUser(existingUser.getId(), existingUser.getEmail(), existingUser.getFirstName(), existingUser.getLastName(), existingUser.getUsername());
                response.put("success", "true");
                response.put("message", "User successfully login");
                response.put("user", loggedUser);
                response.put("token", token);
                return ResponseEntity.ok().body(response);
            } else {
                response.put("success", "false");
                response.put("message", "Wrong Credentials");
                return ResponseEntity.status(400).body(response);
            }
        } catch (Exception ex) {
            throw new Exception("Login failed");
        }

    }

}
