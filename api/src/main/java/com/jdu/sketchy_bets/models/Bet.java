package com.jdu.sketchy_bets.models;

import java.math.BigDecimal;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Bet {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "user_id")
  private Long userId;
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "match_id", referencedColumnName = "id")
  private Match match;
  private BigDecimal amount;
  private Boolean selected_first_team;
  private Boolean win;
  private BigDecimal win_lose_amount;



  public Bet() {}



  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getUserId() {
    return this.userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public Match getMatch() {
    return this.match;
  }

  public void setMatch(Match match) {
    this.match = match;
  }

  public BigDecimal getAmount() {
    return this.amount;
  }

  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public Boolean getSelectedFirstTeam() {
    return this.selected_first_team;
  }

  public void setSelectedFirstTeam(Boolean selectedFirstTeam) {
    this.selected_first_team = selectedFirstTeam;
  }

  public Boolean getWin() {
    return this.win;
  }

  public void setWin(Boolean win) {
    this.win = win;
  }

  public BigDecimal getWinLoseAmount() {
    return this.win_lose_amount;
  }

  public void setWinLoseAmount(BigDecimal winLoseAmount) {
    this.win_lose_amount = winLoseAmount;
  }
}
