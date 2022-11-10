package com.example.SportsBlogApp.Utils;

public class PublicUser {
    public Long id;
    public String email;
    public String firstName;
    public String lastName;
    public String username;


    public PublicUser(Long id, String email, String firstName, String lastName, String username) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }
}
