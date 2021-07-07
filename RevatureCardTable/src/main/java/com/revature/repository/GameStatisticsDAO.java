package com.revature.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.models.GameStatistics;

public interface GameStatisticsDAO extends JpaRepository<GameStatistics, Integer>{

}
