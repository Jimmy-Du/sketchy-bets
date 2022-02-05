package com.jdu.sketchy_bets.controllers;

import java.util.Optional;

import com.jdu.sketchy_bets.models.Match;
import com.jdu.sketchy_bets.repositories.MatchRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/matches")
public class MatchController {
  private MatchRepository matchRepository;



  public MatchController(MatchRepository matchRepository) {
    this.matchRepository = matchRepository;
  }



  // Path:        /matches
  // Function:    getMatches()
  // Description: retrieves all matches from the database
  // Parameters:  N/A
  // Return:      an http response with the matches or an error as to why matches could not be retrieved
  @GetMapping
  public ResponseEntity<?> getMatches() {
    return ResponseEntity.status(HttpStatus.OK).body(matchRepository.findByWinnerIsNull());
  }



  // Path:        /matches/{id}
  // Function:    getMatchById()
  // Description: retrieves a specific match from the database and sends it back to the client
  // Parameters:  id: the id of the match to retrieve information for
  // Return:      an http response with the selected match information or a not found error if the
  //              match does not exist
  @GetMapping
  @RequestMapping("/{id}")
  public ResponseEntity<?>getMatchById(@PathVariable Long id) {
    Optional<Match> selectedMatch = matchRepository.findById(id);

    // if the requested match to be retrieved does not exist, a 404 error is sent back
    if (!selectedMatch.isPresent()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Selected match not found.");
    }

    return ResponseEntity.status(HttpStatus.OK).body(selectedMatch);
  }
}
