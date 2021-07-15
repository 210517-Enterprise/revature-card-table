package com.revature.controller;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.User;
import com.revature.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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
	
	@GetMapping("/user-{id}")
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
	
	@ExceptionHandler(SQLException.class)
	public ResponseEntity<String> handlePSQLException(SQLException exception) {
		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body("Username already exists");
	}
	

}
