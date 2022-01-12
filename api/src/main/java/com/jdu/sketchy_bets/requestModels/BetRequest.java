package com.jdu.sketchy_bets.requestModels;

import java.math.BigDecimal;

public class BetRequest {
  private BigDecimal amount;
  private Long matchId;
  private Boolean betOnFirstTeam;


  public BetRequest() {}



  public BigDecimal getAmount() {
    return this.amount;
  }

  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public Long getMatchId() {
    return this.matchId;
  }

  public void setMatchId(Long matchId) {
    this.matchId = matchId;
  }

  public Boolean getBetOnFirstTeam() {
    return this.betOnFirstTeam;
  }

  public void setBetOnFirstTeam(Boolean betOnFirstTeam) {
    this.betOnFirstTeam = betOnFirstTeam;
  }
}
