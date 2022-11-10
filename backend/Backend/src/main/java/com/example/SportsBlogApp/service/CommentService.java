package com.example.SportsBlogApp.service;


import com.example.SportsBlogApp.entity.Comment;
import com.example.SportsBlogApp.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    //post a comment
    public Comment saveComment(Comment comment){
        return commentRepository.save(comment);
    }

    public boolean contentAvailable(Comment comment){
        boolean contentAvailable = true;
        String content = comment.getContent();
        if(content.equals("")){
            contentAvailable = false;
        }
        return contentAvailable;
    }

    //get all comments
    public List getAllComments(){
        return commentRepository.findAll();
    }

    //get comments by postid
    public List getCommentByPost(Long post_id){
        return commentRepository.findCommentsByPostId(post_id);
    }

    //update comment
    public Comment updateComment(Comment comment){
        return commentRepository.save(comment);
    }

    //delete comment
    public void deleteComment(Long id){
        commentRepository.deleteById(id);
    }

}
