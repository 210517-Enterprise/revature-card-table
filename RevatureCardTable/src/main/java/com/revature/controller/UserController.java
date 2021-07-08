package com.revature.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.User;
import com.revature.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	private UserService userv;
	
	@GetMapping("/{username}")
	public ResponseEntity<UserDetails> findByUsername(@PathVariable("username") String username){
		return ResponseEntity.ok(userv.loadUserByUsername(username));
	}
	
	@GetMapping("/login")
	public ResponseEntity<User> login(String username, String password){
		return ResponseEntity.ok(userv.login(username, password));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<User> findById(@PathVariable("id") int id){
		return ResponseEntity.ok(userv.findById(id));
	}
	
	@GetMapping("/find-all")
	public ResponseEntity<List<User>> findAll(){
		return ResponseEntity.ok(userv.findAll());
	}
	
	@PostMapping("/register")
	public ResponseEntity<User> add(@RequestBody User user){
		User persistedUser = userv.register(user);
		return ResponseEntity.ok(persistedUser);
	}
	
	@DeleteMapping("/delete")
	public void delete(User user){
		userv.delete(user);
	}

}
