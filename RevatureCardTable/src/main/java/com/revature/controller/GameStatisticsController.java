package com.revature.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.GameStatistics;
import com.revature.service.GameStatisticsService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/leaderboard")
public class GameStatisticsController {
	private GameStatisticsService statService;
	
	@Autowired
	public GameStatisticsController(GameStatisticsService statService) {
		this.statService = statService;
	}
	
	@GetMapping("/find-all")
	public ResponseEntity<List<GameStatistics>> getAllStatistics() {
		return ResponseEntity.ok(statService.getAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<List<GameStatistics>> getStatsByID(@PathVariable int id) {
		return ResponseEntity.ok(statService.findByUserId(id));
	}
	
	@GetMapping("/game/{gameName}")
	public ResponseEntity<List<GameStatistics>> getStatsByGameName(@PathVariable String gameName) {
		return ResponseEntity.ok(statService.findByGameName(gameName));
	}
	
	@PostMapping("/create")
	public ResponseEntity<GameStatistics> insert(@RequestBody GameStatistics gs) {
		return ResponseEntity.ok(statService.saveOrUpdate(gs));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Integer> delete(@PathVariable int id) {
		//statService.deleteById(id);
		return new ResponseEntity<>(id, HttpStatus.OK);
	}
}
