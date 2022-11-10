package com.example.SportsBlogApp.controllers;

import com.example.SportsBlogApp.entity.Post;
import com.example.SportsBlogApp.entity.User;
import com.example.SportsBlogApp.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/search")
@CrossOrigin
public class SearchController {
    @Autowired
    private SearchService searchService;

    @GetMapping("/user/{name}")
    public List<User> searchUser(@PathVariable String name){
        System.out.println("username");
        return searchService.findUsers(name);
    }

    @GetMapping("/post/{title}")
    public List<Post> searchPosts(@PathVariable String title){
        return searchService.findPosts(title);
    }
}
