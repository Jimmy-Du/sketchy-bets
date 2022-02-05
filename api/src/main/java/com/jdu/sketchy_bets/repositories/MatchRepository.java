package com.jdu.sketchy_bets.repositories;

import java.util.List;

import com.jdu.sketchy_bets.models.Match;
import com.jdu.sketchy_bets.models.Team;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, Long>{
  List<Match> findByWinnerIsNull();
}
