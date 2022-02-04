package com.jdu.sketchy_bets.controllers;

import java.math.BigDecimal;
import java.util.Date;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.jdu.sketchy_bets.models.AppUser;
import com.jdu.sketchy_bets.models.Bet;
import com.jdu.sketchy_bets.models.Match;
import com.jdu.sketchy_bets.repositories.AppUserRepository;
import com.jdu.sketchy_bets.repositories.BetRepository;
import com.jdu.sketchy_bets.repositories.MatchRepository;
import com.jdu.sketchy_bets.requestModels.BalanceRequest;
import com.jdu.sketchy_bets.requestModels.BetRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bets")
public class BetController {
  private BetRepository betRepository;
  private AppUserRepository appUserRepository;
  private MatchRepository matchRepository;



  public BetController(BetRepository betRepository, AppUserRepository appUserRepository, MatchRepository matchRepository) {
    this.betRepository = betRepository;
    this.appUserRepository = appUserRepository;
    this.matchRepository = matchRepository;
  }



  // Path:        GET /bets
  // Function:    getBets()
  // Description: retrieves all bets made by the user
  // Parameters:  authentication: contains the authentication for the user
  // Return:      an http response with the placed bets by the user
  @GetMapping
  public ResponseEntity<?> getBets(Authentication authentication) {
    JsonObject jsonObject = JsonParser.parseString(authentication.getName()).getAsJsonObject();
    String userEmail = jsonObject.get("sub").getAsString();
    AppUser user = appUserRepository.findByEmail(userEmail);

    // if the user is not found, an error is sent back
    if (user == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid User");
    }

    return ResponseEntity.status(HttpStatus.OK).body(betRepository.findByUserId(user.getId()));
  }



  // Path:        POST /bets
  // Function:    placeBet()
  // Description: contains the functionality to allow a user to place a bet on a specified match
  // Parameters:  authentication: contains the authentication for the user
  //              betRequest: contains information about the bet to be placed passed
  //              in with the body of the request
  // Return:      an http response indicating if placing the bet was successful or not
  @PostMapping
  public ResponseEntity<?> placeBet(Authentication authentication, @RequestBody BetRequest betRequest) {
    JsonObject jsonObject = JsonParser.parseString(authentication.getName()).getAsJsonObject();
    String userEmail = jsonObject.get("sub").getAsString();
    AppUser user = appUserRepository.findByEmail(userEmail);
    Match matchToBet = matchRepository.getById(betRequest.getMatchId());

    // if the amount of the bet is less than 0, an error is sent back to indicate an invalid amount
    if (betRequest.getAmount().compareTo(new BigDecimal("0.00")) < 0) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid amount");
    }
    // if the start date of the match is before the current time, an error is sent back stating the match has already begun
    else if (matchToBet.getMatchDate().before(new Date())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Match has already started, cannot place bet");
    }
    // if the user does not have a higher balance than the requested amount to bet, an error is sent back
    else if (user.getBalance().compareTo(betRequest.getAmount()) < 0) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not enough balance for bet amount");
    }
    // if an existing bet exists with the current user and match, an error is sent back indicating a bet
    // for the match already exists
    else if (betRepository.findByUserIdAndMatchId(user.getId(), betRequest.getMatchId()) != null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already an existing bet for the specified match");
    }
    // else the bet will be placed
    else {
      betRepository.placeBet(user.getId(), betRequest.getMatchId(), betRequest.getAmount(), betRequest.getBetOnFirstTeam());
    }

    return ResponseEntity.status(HttpStatus.CREATED).body("Successfully placed bet");
  }



  // Path:        Patch /bets/{id}/amount
  // Function:    updateBetAmount()
  // Description: contains the functionality to allow a user to update a previously placed bet
  // Parameters:  authentication: contains the authentication for the user
  //              updateRequest: contains the new amount that the bet will be updated with and is passed
  //              in with the body of the request
  //              id: the id of the bet to be changed
  // Return:      an http response indicating if updating the bet was successful or not
  @PatchMapping
  @RequestMapping("/{id}/amount")
  public ResponseEntity<?> updateBetAmount(Authentication authentication, 
                                            @RequestBody BalanceRequest updateRequest, 
                                            @PathVariable Long id) {
    JsonObject jsonObject = JsonParser.parseString(authentication.getName()).getAsJsonObject();
    String userEmail = jsonObject.get("sub").getAsString();
    AppUser user = appUserRepository.findByEmail(userEmail);
    Bet betToUpdate = betRepository.findByIdAndUserId(id, user.getId());
    
    // if the amount of the bet is less than 0, an error is sent back to indicate an invalid amount
    if (updateRequest.getAmount().compareTo(new BigDecimal("0.00")) < 0) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid amount");
    }
    // if the bet does not exist, an error is sent back
    else if (betToUpdate == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bet not found");
    }
    // if the start date of the match is before the current time, an error is sent back stating the match has already begun 
    else if (betToUpdate.getMatch().getMatchDate().before(new Date())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Match has already started, cannot alter bet");
    }
    
    BigDecimal remainingUserBalance = user.getBalance().add(betToUpdate.getAmount()).subtract(updateRequest.getAmount());

    // if the new balance after the new bet amount is updated is less than 0, and error is sent back
    if (remainingUserBalance.compareTo(new BigDecimal("0.00")) < 0) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Updated bet amount cannot exceed user balance");
    }
    
    // calls procedure to update the bet
    betRepository.updateBetAmount(user.getId(), betToUpdate.getId(), updateRequest.getAmount());

    return ResponseEntity.status(HttpStatus.CREATED).body("Sucessfully Updated Bet Amount");
  }



  // Path:        Patch /bets/{id}/team
  // Function:    updateBetTeam()
  // Description: contains the functionality to allow a user to change the team of the bet
  // Parameters:  authentication: contains the authentication for the user
  //              id: the id of the bet to be changed
  // Return:      an http response indicating if updating the bet was successful or not
  @PatchMapping
  @RequestMapping("/{id}/team")
  public ResponseEntity<?> updateBetTeam(Authentication authentication, @PathVariable Long id) {
    JsonObject jsonObject = JsonParser.parseString(authentication.getName()).getAsJsonObject();
    String userEmail = jsonObject.get("sub").getAsString();
    AppUser user = appUserRepository.findByEmail(userEmail);
    Bet betToUpdate = betRepository.findByIdAndUserId(id, user.getId());

    // if the bet does not exist, an error is sent back
    if (betToUpdate == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bet not found");
    }
    // if the start date of the match is before the current time, an error is sent back stating the match has already begun 
    else if (betToUpdate.getMatch().getMatchDate().before(new Date())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Match has already started, cannot alter bet");
    }

    // calls query to invert the selected team of the bet
    betRepository.updateBetTeam(id);

    return ResponseEntity.status(HttpStatus.CREATED).body("Sucessfully Updated Bet Team");
  }



  // Path:        Delete /bets/{id}
  // Function:    deleteBet()
  // Description: contains the functionality to delete a bet previously placed by the user
  // Parameters:  authentication: contains the authentication for the user
  //              id: the id of the bet to be changed
  // Return:      an http response indicating if deleting the bet was successful or not
  @DeleteMapping
  @RequestMapping("/{id}")
  public ResponseEntity<?> deleteBet(Authentication authentication, @PathVariable Long id) {
    JsonObject jsonObject = JsonParser.parseString(authentication.getName()).getAsJsonObject();
    String userEmail = jsonObject.get("sub").getAsString();
    AppUser user = appUserRepository.findByEmail(userEmail);
    Bet betToDelete = betRepository.findByIdAndUserId(id, user.getId());

    // if the bet does not exist, an error is sent back
    if (betToDelete == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bet not found");
    }
    // if the start date of the match is before the current time, an error is sent back stating the match has already begun 
    if (betToDelete.getMatch().getMatchDate().before(new Date())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Match has already started, cannot alter bet");
    }

    betRepository.deleteBet(user.getId(), id);

    return ResponseEntity.status(HttpStatus.CREATED).body("Sucessfully Deleted");
  }
}
