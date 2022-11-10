package com.example.SportsBlogApp.repository;

import com.example.SportsBlogApp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {


//    @Query("from User where email=?1")
//    public User findByEMAIL(String email);
//
//    @Query("from User where email=?1 and password=?2")
//    public User findByUsernamePassword(String username,String password);

    User findByUsername(String username);
    @Query("from User where email=?1 and password=?2")
    public User findByUsernamePassword(String username,String password);

    @Query("from User where firstName like %?1% or lastName like %?1%")
    public List<User> findByName(String name);
}
