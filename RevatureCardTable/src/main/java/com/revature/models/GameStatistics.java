package com.revature.models;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="leaderboard")
@Data @NoArgsConstructor
public class GameStatistics {
	
	@Id
	@Column(name="game_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private int userID;
	
	@Column(name="points", nullable=false)
	private int points;
	
	@Column(name="won", nullable=false)
	private boolean won;
	
	@Column(name="date_played", nullable=false)
	private Date datePlayed;
	
	@Column(name="time_completed", nullable=true)
	private Time timeCompleted;
	
	@Column(name="game_name", nullable=false)
	private String gameName;

}
