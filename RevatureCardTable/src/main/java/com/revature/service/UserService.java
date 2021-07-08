package com.revature.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.revature.models.User;
import com.revature.repository.UserDAO;
import com.revature.security.CustomUserDetails;

@Service
public class UserService implements UserDetailsService{
	
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

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = udao.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Failed to find username: " + username));
		return new CustomUserDetails(user);
	}
	

}
