package com.jdu.sketchy_bets.repositories;

import java.math.BigDecimal;
import java.util.List;

import com.jdu.sketchy_bets.models.Bet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface BetRepository extends JpaRepository<Bet, Long>{
  List<Bet> findByUserId(Long userId);

  Bet findByIdAndUserId(Long id, Long userId);

  Bet findByUserIdAndMatchId(Long userId, Long matchId);

  @Transactional
  @Modifying
  @Query(value = "UPDATE bet SET selected_first_team = NOT selected_first_team WHERE id = :id", nativeQuery = true)
  public void updateBetTeam(@Param("id") Long id);

  @Transactional
  @Modifying
  @Query(value = "CALL place_bet(:bet_user_id, :bet_match_id, :bet_amount, :bet_first_team)", nativeQuery = true)
  public void placeBet(@Param("bet_user_id") Long userId, 
                        @Param("bet_match_id") Long matchId, 
                        @Param("bet_amount") BigDecimal betAmount,
                        @Param("bet_first_team") Boolean betFirstTeam);

  @Transactional
  @Modifying
  @Query(value = "CALL update_bet_amount(:bet_user_id, :bet_id, :new_bet_amount)", nativeQuery = true)
  public void updateBetAmount(@Param("bet_user_id") Long userId, 
                              @Param("bet_id") Long betId, 
                              @Param("new_bet_amount") BigDecimal newBetAmount);

  @Transactional
  @Modifying
  @Query(value = "CALL delete_bet(:bet_user_id, :bet_id)", nativeQuery = true)
  public void deleteBet(@Param("bet_user_id") Long userId, 
                        @Param("bet_id") Long betId);
}
