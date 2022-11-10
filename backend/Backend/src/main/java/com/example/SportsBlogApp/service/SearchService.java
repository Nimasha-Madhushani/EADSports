package com.example.SportsBlogApp.service;

import com.example.SportsBlogApp.entity.Post;
import com.example.SportsBlogApp.entity.User;
import com.example.SportsBlogApp.repository.PostRepository;
import com.example.SportsBlogApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class SearchService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;

    public List<User> findUsers(String name){
        return userRepository.findByName(name);
    }

    public List<Post> findPosts(String title){
        return postRepository.findByTitle(title);
    }
}
