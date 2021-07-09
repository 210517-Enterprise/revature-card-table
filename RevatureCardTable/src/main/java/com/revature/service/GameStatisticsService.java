package com.revature.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.models.GameStatistics;
import com.revature.models.User;
import com.revature.repository.GameStatisticsDAO;
import com.revature.repository.UserDAO;

@Service
public class GameStatisticsService {

	private GameStatisticsDAO gameStatRepo;
	private UserDAO userRepo;
	
	@Autowired
	public GameStatisticsService(GameStatisticsDAO gameStatRepo, UserDAO userRepo) {
		this.gameStatRepo = gameStatRepo;
		this.userRepo = userRepo;
	}
	
	public List<GameStatistics> findByUserId(int id) {
		User u = userRepo.getById(id);
		return gameStatRepo.findByUser(u);
	}
	
	public GameStatistics saveOrUpdate(GameStatistics gameStat) {
		return gameStatRepo.save(gameStat);
	}
	
	public List<GameStatistics> getAll() {
		return gameStatRepo.findAll();
	}
	
	public List<GameStatistics> findByGameName(String gameName) {
		return gameStatRepo.findByGameName(gameName);
	}
	
	public int getNumberOfWins(User user, String gameName) {
		return gameStatRepo.findNumberOfWinsByUserIDAndGameName(user, gameName);
	}
	
	public void deleteById(int id) {
		gameStatRepo.deleteById(id);
	}
}
