package com.example.SportsBlogApp.repository;

import com.example.SportsBlogApp.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value = "SELECT * FROM Posts WHERE post_id=?1",nativeQuery = true)
    Post findByPost_id(Long post_id);
//    Post getPostByPost_id(Long id);

    @Query("from Post where title like %?1%")
    public List<Post> findByTitle(String title);
}
