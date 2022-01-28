package com.jdu.sketchy_bets.repositories;
import com.jdu.sketchy_bets.models.AppUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AppUserRepository extends JpaRepository<AppUser, Long>{
  AppUser findByEmail(String email);
  @Query(value = "SELECT balance FROM \"user\" WHERE email = :email", nativeQuery = true)
  Object getBalanceByEmail(@Param("email") String email);
}
