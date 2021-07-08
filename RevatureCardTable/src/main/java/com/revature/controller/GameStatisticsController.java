package com.revature.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.GameStatistics;
import com.revature.service.GameStatisticsService;

@RestController
@RequestMapping("/leaderboard")
public class GameStatisticsController {
	private GameStatisticsService statService;
	
	@Autowired
	public GameStatisticsController(GameStatisticsService statService) {
		this.statService = statService;
	}
	
	@GetMapping
	public List<GameStatistics> getAllStatistics() {
		return statService.getAll();
	}
}