package com.example.SportsBlogApp.controllers;

import com.example.SportsBlogApp.entity.Comment;
import com.example.SportsBlogApp.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/comment")
@CrossOrigin
public class CommentController {
    @Autowired
    private CommentService commentService;

    @RequestMapping(value = "/saveComment", method = RequestMethod.POST)
    public ResponseEntity<Map> saveComment(@RequestBody Comment comment){
        System.out.println(comment);
        HashMap<String,Object> response = new HashMap<>();
        if(commentService.contentAvailable(comment)){
           Comment cmt = commentService.saveComment(comment);
            response.put("message","comments successfully added");
            response.put("comment",cmt);
            return ResponseEntity.ok().body(response);
        } else {
            response.put("message","comments not added");
            return ResponseEntity.status(400).body(response);
        }

    }

    @RequestMapping(value = "/allComment", method = RequestMethod.GET)
    public ResponseEntity<Map> getAllComments(){
        HashMap<String,Object> response = new HashMap<>();

        List comments = commentService.getAllComments();
        System.out.println(comments);
        response.put("message","comments sucessfully fetched");
        response.put("comments",comments);
        return ResponseEntity.ok().body(response);
    }

    //get comments by postid
    @RequestMapping(value = "/getComment/{post_id}",method = RequestMethod.GET)
    public ResponseEntity<Map> getCommentByPost(@PathVariable Long post_id){
        HashMap<String,Object> response = new HashMap<>();
        List comment= commentService.getCommentByPost(post_id);
        response.put("message","comments successfully fetched");
        response.put("comments",comment);
        return ResponseEntity.ok().body(response);
    }

    //update comment
    @PutMapping(value = "/updateComment/{id}")
    public ResponseEntity<Map> updateComment(@RequestBody Comment comment , @PathVariable Long id){
        HashMap<String,Object> response = new HashMap<>();
        commentService.updateComment(comment);
        return ResponseEntity.ok().body(response);
    }

    //delete comment
    @RequestMapping(value = "/deleteComment/{id}",method = RequestMethod.DELETE)
    public ResponseEntity<Map> deleteComment(@PathVariable Long id){
        HashMap<String,Object> response = new HashMap<>();
        commentService.deleteComment(id);
        response.put("message","delete comment successfully");
        return ResponseEntity.ok().body(response);
    }

}
          
