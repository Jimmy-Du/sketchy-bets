package com.jdu.sketchy_bets.repositories;

import com.jdu.sketchy_bets.models.Match;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, Long>{}
