package com.example.SportsBlogApp.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Set;


@Data

@Entity
@Table(name = "POSTS")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id", nullable = false)
    private Long post_id;

    @NotNull(message = "Title cannot be empty")
    @Column(name = "title",   length = 75)
    private String title;


    @NotNull(message = "Description cannot be empty")
    @Length(min = 10, message = "Post description should contain more than 10 characters ")
    @Column(name = "description")
    private String description;

    @Column(name = "imageURL")
    private String imageURL;

//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "user_id", nullable = false)
//    private User USER;

    @CreationTimestamp
    @Column(name = "createdAt")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;

//    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY,
//            cascade = CascadeType.ALL)
//    private Set<Comment> comments;

//
//
//    @NotNull(message = "Description cannot be empty")
//    @Length(min = 500, message = "Post description should contain more than 500 characters ")
//    @Column(name = "description",  length = 5000)
//    private String description;
//
//
//
//    @Column(name = "image")
//    private String image;
//
//    @Column(name = "createdAt", length = 50)
//    private LocalDateTime createdAt;
//
//
//    @Column(name = "updatedAt", length = 50)
//    private LocalDateTime updatedAt;



}