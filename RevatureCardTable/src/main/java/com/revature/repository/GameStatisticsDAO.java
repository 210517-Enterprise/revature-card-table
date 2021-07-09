package com.revature.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.revature.models.GameStatistics;
import com.revature.models.User;

public interface GameStatisticsDAO extends JpaRepository<GameStatistics, Integer>{

	@Query("SELECT count(id) FROM GameStatistics g where g.user = :user AND g.gameName = :gameName AND g.won = true")
	int findNumberOfWinsByUserIDAndGameName(@Param("user") User user, @Param("gameName") String gameName);
	
	@Query("SELECT g FROM GameStatistics g WHERE g.gameName = :gameName")
	List<GameStatistics> findByGameName(@Param("gameName") String gameName);
	
	@Query("SELECT * FROM GameStatistics g WHERE g.user = :user")
	List<GameStatistics> findByUser(@Param("user") User user);
}
