package com.jdu.sketchy_bets.services;

import com.jdu.sketchy_bets.models.AppUser;
import com.jdu.sketchy_bets.repositories.AppUserRepository;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static java.util.Collections.emptyList;

@Service
public class AppUserDetailsService implements UserDetailsService{
  private AppUserRepository appUserRepository;



  public AppUserDetailsService(AppUserRepository appUserRepository) {
    this.appUserRepository = appUserRepository;
  }


  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    AppUser applicationUser = appUserRepository.findByEmail(email);
    if (applicationUser == null) {
        throw new UsernameNotFoundException(email);
    }
    return new User(applicationUser.getEmail(), applicationUser.getPassword(), emptyList());
}
}
