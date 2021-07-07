package com.revature.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="users")
@Data @NoArgsConstructor
public class User {
	
	@Id
	@Column(name="user_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="username", unique=true, nullable=false)
	private String username;
	
	private String password;
	
	private String firstName;
	
	private String lastName;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="users")
	private List<GameStatistics> gameStats;

}
