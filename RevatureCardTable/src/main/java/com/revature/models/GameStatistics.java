package com.revature.models;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

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
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id", nullable=false, referencedColumnName="user_id")
	private User user;
	
	@Column(name="points", nullable=false)
	private int points;
	
	@Column(name="won", nullable=false)
	private boolean won;
	
	@Column(name="date_played", nullable=false)
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="MM/dd/yyyy")
	private Date datePlayed;
	
	@Column(name="time_completed", nullable=false)
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="hh:mm a")
	private Time timeCompleted;
	
	@Column(name="game_name", nullable=false)
	private String gameName;

}
