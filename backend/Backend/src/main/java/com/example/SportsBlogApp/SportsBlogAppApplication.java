package com.example.SportsBlogApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;


@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class SportsBlogAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(SportsBlogAppApplication.class, args);
	}

}
