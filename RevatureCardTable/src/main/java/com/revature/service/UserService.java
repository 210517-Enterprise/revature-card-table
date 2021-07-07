package com.revature.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.models.User;
import com.revature.repository.UserDAO;

@Service
public class UserService {
	
	@Autowired
	private UserDAO udao;
	
	public User login(String username, String password) {
		Optional<User> user = udao.findByUsername(username);
		
		if(user.isPresent()) {
			if(user.get().getPassword().equals(password))
				return user.get();
		}
		
		return null;
	}
	
	public void register(User user) {
		udao.save(user);
	}
	

}
