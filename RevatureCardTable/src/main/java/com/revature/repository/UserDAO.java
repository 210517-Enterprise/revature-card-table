package com.revature.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.models.User;

public interface UserDAO extends JpaRepository<User, Integer> {
	
	public Optional<User> findByUsername(String username);

}
