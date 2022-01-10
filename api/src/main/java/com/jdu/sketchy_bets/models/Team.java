package com.jdu.sketchy_bets.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Team {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String team_name;

  

  public Team() {}


  public Team(Long id, String teamName) {
    this.id = id;
    this.team_name = teamName;
  }


  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTeamName() {
    return this.team_name;
  }

  public void setTeamName(String teamName) {
    this.team_name = teamName;
  }
}
