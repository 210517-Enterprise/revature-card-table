package com.revature;

import java.sql.Date;
import java.sql.Time;

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
		
		GameStatistics stats = new GameStatistics();
		stats.setUser(user);
		stats.setPoints(20);
		stats.setWon(true);
		stats.setGameName("war");
		
		repo.save(stats);
	}
}
