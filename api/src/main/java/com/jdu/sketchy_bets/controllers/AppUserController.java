package com.jdu.sketchy_bets.controllers;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.jdu.sketchy_bets.models.AppUser;
import com.jdu.sketchy_bets.repositories.AppUserRepository;
import com.jdu.sketchy_bets.requestModels.BalanceRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class AppUserController {
  private AppUserRepository appUserRepository;
  private BCryptPasswordEncoder bCryptPasswordEncoder;
 


  public AppUserController(BCryptPasswordEncoder bCryptPasswordEncoder, AppUserRepository appUserRepository) {
    this.appUserRepository = appUserRepository;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
  }



  // Path:        /users/register
  // Function:    registerUser()
  // Description: contains the functionality to register a new user to the database
  // Parameters:  appUser: an AppUser object created from the request body passed into the route,
  //              will then be used to create a new user that can access the application
  // Return:      an http response indicating whether or not a new user has been created or not
  @PostMapping
  @RequestMapping("/register")
  public ResponseEntity<?> registerUser(@RequestBody AppUser appUser) {

    AppUser existingUser = appUserRepository.findByEmail(appUser.getEmail());
    Pattern validEmailPattern = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
    Matcher matcher = validEmailPattern.matcher(appUser.getEmail());

    // if a valid email cannot be found, an invalid email error is sent back
    if (!matcher.find()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email.");
    }
    // if a user with the same email is found, an error is sent back indicating the email is taken
    else if (existingUser != null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already in use.");
    }
    // if the password is null or less than 7 characters an error is sent back indicating invalid password
    else if (appUser.getPassword() == null || appUser.getPassword().length() < 7) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid password. Password must be 7 characters or longer.");
    }
    
    // encodes the password then saves the user into the database
    appUser.setPassword(bCryptPasswordEncoder.encode(appUser.getPassword()));
    appUserRepository.save(appUser);

    return ResponseEntity.status(HttpStatus.CREATED).body("Registered");
  }



  // Route:       /users/balance
  // Function:    getBalance()
  // Description: retrieves the balance of the current user
  // Parameters:  authentication: object that contains information about the logged in user
  // Return:      an http response with the balance of the current user
  @GetMapping
  @RequestMapping("/balance")
  public ResponseEntity<?> getBalance(Authentication authentication) {
    // parses the jwt token to retrieve the email of the user request
    JsonObject jsonObject = JsonParser.parseString(authentication.getName()).getAsJsonObject();
    String userEmail = jsonObject.get("sub").getAsString();

    return ResponseEntity.status(HttpStatus.CREATED).body(appUserRepository.getBalanceByEmail(userEmail)); 
  }



  // Route:       /users/deposit
  // Function:    depositBalance()
  // Description: attempts to deposit the amount requested into the user's balance
  // Parameters:  authentication: object that contains information about the logged in user
  //              deposit: the amount to be deposited into the user's balance
  // Return:      an http response indicating whether or not the the deposit request was successful or not
  @PostMapping
  @RequestMapping("/deposit")
  public ResponseEntity<?> depositBalance(Authentication authentication, @RequestBody BalanceRequest deposit) {
    // parses the jwt token to retrieve the email of the user request
    JsonObject jsonObject = JsonParser.parseString(authentication.getName()).getAsJsonObject();
    String userEmail = jsonObject.get("sub").getAsString();
    AppUser appUser = this.appUserRepository.findByEmail(userEmail);

    appUser.depositIntoBalance(deposit.getAmount());
    appUserRepository.save(appUser);

    return ResponseEntity.status(HttpStatus.CREATED).body("Successful Deposit"); 
  }



  // Route:       /users/withdraw
  // Function:    withdrawBalance()
  // Description: attempts to withdraw the amount requested from the user's balance
  // Parameters:  authentication: object that contains information about the logged in user
  //              withdraw: the amount to be withdrawn from the user's balance
  // Return:      an http response indicating whether or not the the withdraw request was successful or not
  @PostMapping()
  @RequestMapping("/withdraw")
  public ResponseEntity<?> withdrawBalance(Authentication authentication, @RequestBody BalanceRequest withdraw) {
    // parses the jwt token to retrieve the email of the user request
    JsonObject jsonObject = JsonParser.parseString(authentication.getName()).getAsJsonObject();
    String userEmail = jsonObject.get("sub").getAsString();
    AppUser appUser = this.appUserRepository.findByEmail(userEmail);

    // if the user does not have a balance equal or more than the requested withdraw amount, an error is sent back
    if (appUser.getBalance().compareTo(withdraw.getAmount()) < 0) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot withdraw more than balance amount"); 
    }

    // subtracts the requested withdraw amount and updates the user
    appUser.withdrawFromBalance(withdraw.getAmount());
    appUserRepository.save(appUser);

    return ResponseEntity.status(HttpStatus.CREATED).body("Successful Withdraw");
  }
}
