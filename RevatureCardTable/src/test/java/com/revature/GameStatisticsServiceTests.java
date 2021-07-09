package com.revature;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import com.revature.models.GameStatistics;
import com.revature.models.User;
import com.revature.repository.GameStatisticsDAO;
import com.revature.repository.UserDAO;

@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
@SpringBootTest
public class GameStatisticsServiceTests {
	
	@Autowired
	private GameStatisticsDAO repo;
	
	@Autowired
	private UserDAO userRepo;
	
	@Test
	public void testCreateStatistics() {
		User user = new User();
		user.setFirstName("rarysy");
		user.setLastName("tempor");
		user.setPassword("test");
		user.setUsername("test");
		userRepo.save(user);
		
		for (int i = 0; i < 2; i++) {
			GameStatistics stats = new GameStatistics();
			stats.setUser(user);
			stats.setPoints(i * 20);
			stats.setWon(true);
			stats.setGameName("gofish");
			stats.setDatePlayed(new Date(10));
			stats.setTimeCompleted(new Time(10));
			repo.save(stats);
		}
		
		for (int i = 0; i < 2; i++) {
			GameStatistics stats = new GameStatistics();
			stats.setUser(user);
			stats.setPoints(i * 20);
			stats.setWon(true);
			stats.setGameName("war");
			stats.setDatePlayed(new Date(10));
			stats.setTimeCompleted(new Time(10));
			repo.save(stats);
		}
		
		List<GameStatistics> list = repo.findByGameName("war");
		System.out.println("Here");
	}
	
	@Test
	public void testCountWins() {
		User user = new User();
		user.setFirstName("rarysy");
		user.setLastName("tempor");
		user.setPassword("test");
		user.setUsername("test");
		userRepo.save(user);
		
		for (int i = 0; i < 4; i++) {
			GameStatistics stats = new GameStatistics();
			stats.setUser(user);
			stats.setPoints(i * 20);
			stats.setWon(true);
			stats.setGameName("war");
			stats.setDatePlayed(new Date(10));
			stats.setTimeCompleted(new Time(10));
			repo.save(stats);
		}
		
		for (int i = 0; i < 4; i++) {
			GameStatistics stats = new GameStatistics();
			stats.setUser(user);
			stats.setPoints(i * 20);
			stats.setWon(false);
			stats.setGameName("war");
			stats.setDatePlayed(new Date(10));
			stats.setTimeCompleted(new Time(10));
			repo.save(stats);
		}
		
		assertEquals(4, repo.findNumberOfWinsByUserIDAndGameName(user, "war"));
	}
}
