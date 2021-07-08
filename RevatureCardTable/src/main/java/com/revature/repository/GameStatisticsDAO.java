package com.revature.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.revature.models.GameStatistics;

public interface GameStatisticsDAO extends JpaRepository<GameStatistics, Integer>{

	@Query("SELECT SUM(g.won) FROM GameStatistics g where g.userID = :userID AND g.gameName = :gameName")
	int findNumberOfWinsByUserIDAndGameName(@Param("userID") int userID, @Param("gameName") String gameName);
	
	@Query("SELECT * FROM GameStatistics g WHERE g.gameName = :gameName")
	List<GameStatistics> findByGameName(@Param("gameName") String gameName);
	
	List<GameStatistics> findByUsername(@Param("username") String username);
}
