package com.jdu.sketchy_bets.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "\"user\"")
public class AppUser {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String email;
  private String password;
  private Double balance = 0.0;



  public AppUser() {}



  public AppUser(Long id, String email, String password, Double balance) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.balance = balance;
  }



  public AppUser(String email, String password) {
    this.email = email;
    this.password = password;
  }


  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Double getBalance() {
    return this.balance;
  }

  public void setBalance(Double balance) {
    this.balance = balance;
  }


  public void depositIntoBalance(Double amountToDeposit) {
    this.balance += amountToDeposit;
  }


  public void withdrawFromBalance(Double amountToWithdraw) {
    this.balance -= amountToWithdraw;
  }
}
