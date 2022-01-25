import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match } from 'src/app/interfaces/Match';
import { MatchService } from 'src/app/services/match/match.service';

@Component({
  selector: 'app-match-by-id',
  templateUrl: './match-by-id.component.html',
  styleUrls: ['./match-by-id.component.css']
})
export class MatchByIdComponent implements OnInit {
  selectedMatch?: Match
  amountInput: number = 0.00

  constructor(private matchService: MatchService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.matchService.getMatchById(this.activeRoute.snapshot.params['matchId'])
      .subscribe({
        next: (match) => this.selectedMatch = match
      })
  }



  // Function:    
  // Description: 
  // Parameters:  
  // Return:      
  placeBetHandler() {
    console.log("place bet");
  }
}
