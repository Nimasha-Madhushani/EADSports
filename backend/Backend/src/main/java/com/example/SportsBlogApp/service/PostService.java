package com.example.SportsBlogApp.service;

import com.example.SportsBlogApp.entity.Post;
import com.example.SportsBlogApp.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PostService {
    @Autowired
    private PostRepository postRepository;
    public Post savePost(Post post)
    {
        return postRepository.save(post);
    }

    public boolean isNotImage(Post post)
    {
        boolean insertedImage = true;
        String url = post.getImageURL();
        if(url.equals(""))
        {
            insertedImage = false;
        }
        return insertedImage;
    }
    public boolean emptyTitle(Post post)
    {
        boolean titleIncluded = true;
        String title = post.getTitle();
        if(title.equals(""))
        {
            titleIncluded = false;
        }
        return titleIncluded;
    }
    public boolean emptyDescription(Post post)
    {
        boolean descriptionIncluded = true;
        String description = post.getDescription();
        if(description.equals(""))
        {
            descriptionIncluded = false;
        }
        return descriptionIncluded;
    }



public Post updatePost(Post post) {

    return postRepository.save(post);
}

    public  void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    public boolean isPostExists(Long id) {
        boolean postExists = false;

        Post existingPost = postRepository.findByPost_id(id);

        if (existingPost != null) {
            postExists = true;
        }
        return postExists;
    }
    public List getAllPosts() {
        System.out.println("serveice");
        return postRepository.findAll();
    }

    public Post getSinglePost(Long id) {
        return postRepository.findById(id).get();
    }
}
