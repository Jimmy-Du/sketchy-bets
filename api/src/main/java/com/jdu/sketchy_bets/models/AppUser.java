package com.jdu.sketchy_bets.models;

import java.math.BigDecimal;

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
  private BigDecimal balance = new BigDecimal("0.0");



  public AppUser() {}



  public AppUser(Long id, String email, String password, BigDecimal balance) {
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

  public BigDecimal getBalance() {
    return this.balance;
  }

  public void setBalance(BigDecimal balance) {
    this.balance = balance;
  }


  public void depositIntoBalance(BigDecimal amountToDeposit) {
    this.balance = this.balance.add(amountToDeposit).setScale(2);
  }


  public void withdrawFromBalance(BigDecimal amountToWithdraw) {
    this.balance = this.balance.subtract(amountToWithdraw).setScale(2);
  }
}
