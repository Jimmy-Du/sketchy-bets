package com.jdu.sketchy_bets.repositories;
import com.jdu.sketchy_bets.models.AppUser;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, Long>{
  AppUser findByEmail(String email);
}
