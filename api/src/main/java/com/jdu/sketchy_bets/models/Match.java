package com.jdu.sketchy_bets.models;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Match {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Date match_date;
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "first_team_id", referencedColumnName = "id")
  private Team firstTeam;
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "second_team_id", referencedColumnName = "id")
  private Team secondTeam;
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "winner", referencedColumnName = "id", nullable = true)
  private Team winner;
  private BigDecimal first_team_odds;
  private BigDecimal second_team_odds;
  

  public Match() {}


  
  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Date getMatchDate() {
    return this.match_date;
  }

  public void setMatchDate(Date date) {
    this.match_date = date;
  }

  public Team getFirstTeam() {
    return this.firstTeam;
  }

  public void setFirstTeam(Team firstTeam) {
    this.firstTeam = firstTeam;
  }

  public Team getSecondTeam() {
    return this.secondTeam;
  }

  public void setSecondTeam(Team secondTeam) {
    this.secondTeam = secondTeam;
  }

  public Team getWinner() {
    return this.winner;
  }

  public void setWinner(Team winner) {
    this.winner = winner;
  }

  public BigDecimal getFirstTeamOdds() {
    return this.first_team_odds;
  }

  public void setFirstTeamOdds(BigDecimal firstTeamOdds) {
    this.first_team_odds = firstTeamOdds;
  }

  public BigDecimal getSecondTeamOdds() {
    return this.second_team_odds;
  }

  public void setSecondTeamOdds(BigDecimal secondTeamOdds) {
    this.second_team_odds = secondTeamOdds;
  }
}
