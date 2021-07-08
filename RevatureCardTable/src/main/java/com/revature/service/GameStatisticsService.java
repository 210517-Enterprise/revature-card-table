package com.revature.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.models.GameStatistics;
import com.revature.repository.GameStatisticsDAO;

@Service
public class GameStatisticsService {

	private GameStatisticsDAO gameStatRepo;
	
	@Autowired
	public GameStatisticsService(GameStatisticsDAO gameStatRepo) {
		this.gameStatRepo = gameStatRepo;
	}
	
	public void saveOrUpdate(GameStatistics gameStat) {
		gameStatRepo.save(gameStat);
	}
	
	public List<GameStatistics> getAll() {
		return gameStatRepo.findAll();
	}
	
	public List<GameStatistics> findByGameName(String gameName) {
		return gameStatRepo.findByGameName(gameName);
	}
	
	public int getNumberOfWins(int userID, String gameName) {
		return gameStatRepo.findNumberOfWinsByUserIDAndGameName(userID, gameName);
	}
}
