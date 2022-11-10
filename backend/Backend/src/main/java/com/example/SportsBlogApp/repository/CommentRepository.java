package com.example.SportsBlogApp.repository;

import com.example.SportsBlogApp.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    @Query(value = "SELECT * FROM Comments WHERE post_id=?1",nativeQuery = true)
    List findCommentsByPostId(@Param("post_id") Long post_id);
}
