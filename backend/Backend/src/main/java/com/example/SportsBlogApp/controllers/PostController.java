package com.example.SportsBlogApp.controllers;

import com.example.SportsBlogApp.entity.Post;

import com.example.SportsBlogApp.service.PostService;

import org.hibernate.annotations.Formula;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController


@RequestMapping(value = "/post")
@CrossOrigin
public class PostController {
    @Autowired
    private PostService postService;

    @PutMapping("/updatePost/{id}")
    public ResponseEntity<Map> postUpdate(@RequestBody Post post, @PathVariable int id) {


        System.out.println(post);
        System.out.println(id);
        HashMap<String, Object> response = new HashMap<>();


        if (postService.isPostExists(post.getPost_id())) {
            postService.updatePost(post);
            response.put("success", "true");
            response.put("message", "Post successfully updated");
            return ResponseEntity.ok().body(response);
        } else {
            response.put("success", "false");
            response.put("message", "Post is not existing");
            return ResponseEntity.status(400).body(response);

        }

    }

    @RequestMapping(value = "/deletePost/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Map> deletePost(@PathVariable Long id) {

        HashMap<String, Object> response = new HashMap<>();


        if (postService.isPostExists(id)) {
            postService.deletePost(id);
            response.put("success", "true");
            response.put("message", "Post successfully deleted");
            return ResponseEntity.ok().body(response);
        } else{
            response.put("success", "false");
            response.put("message", "Post is not existing");
            return ResponseEntity.status(400).body(response);

        }
    }




    @RequestMapping(value = "/savePost", method = RequestMethod.POST)
    public ResponseEntity<String> savePost(@RequestBody Post post)
    {
        System.out.println(post);
        if(postService.isNotImage(post)&&postService.emptyTitle(post)&&postService.emptyDescription(post))
        {
            postService.savePost(post);
            return ResponseEntity.ok().body("Post successfully Inserted!") ;
        }
        return ResponseEntity.status(400).body("Image and Description and Title must be inserted!");

    }


    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity<Map> getAllPost() {
        HashMap<String, Object> response = new HashMap<>();

        List posts = postService.getAllPosts();
        System.out.println(posts);
        response.put("success", "true");
        response.put("message", "Posts successfully fetched");
        response.put("posts", posts);
        return ResponseEntity.ok().body(response);
    }

    @RequestMapping(value = "/getPost/{id}", method = RequestMethod.GET)
    public ResponseEntity<Map> getSingleUser(@PathVariable Long id) {

        HashMap<String, Object> response = new HashMap<>();

        Post post = postService.getSinglePost(id);
        response.put("success", "true");
        response.put("message", "User successfully fetched");
        response.put("post", post);
        return ResponseEntity.ok().body(response);
    }
//
//    @Formula("(select count(user_id) from Likes l where l.post_id = post_id)")
//    private int countLike;
//
//
//    public boolean isLiked(){
//        return getCountLike() > 0;
//    }
}
