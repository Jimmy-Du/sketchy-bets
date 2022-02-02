import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from 'src/app/interfaces/Match';
import { BetService } from 'src/app/services/bet/bet.service';

@Component({
  selector: 'app-place-bet',
  templateUrl: './place-bet.component.html',
  styleUrls: ['./place-bet.component.css']
})
export class PlaceBetComponent implements OnInit {
  @Input() matchInfo?: Match 
  firstTeamSelected: boolean = true
  amountInput?: number
  potentialReward: number = 0.00
  error: string = ""

  constructor(private betService: BetService, private router: Router) { }

  ngOnInit(): void {
  }



  // Function:    amountChangedHandler()
  // Description: calculates the potential reward based on the amount entered and the selected team
  // Parameters:  N/A
  // Return:      N/A
  amountChangeHandler() {
    // if the current amount entered is null or undefined the potential reward is set to 0.00
    if (this.amountInput === null || this.amountInput === undefined) {
      this.potentialReward = 0.00
    }
    // else, the potential reward is calculated based on the odds of the selected team and amount entered
    else {
      // if the current selected team for the bet is the first team, the first team's odds are used
      // to calculate the potential rewards
      if (this.firstTeamSelected) {
        this.potentialReward = this.amountInput! * this.matchInfo!.firstTeamOdds
      }
      // else  the second team's odds are used to calculate the potential rewards
      else {
        this.potentialReward = this.amountInput! * this.matchInfo!.secondTeamOdds
      }
    }
  }



  // Function:    placeBetHandler()
  // Description: called upon when the user clicks the "Place Bet" button and attempts
  //              to place the bet specified by the user
  // Parameters:  N/A
  // Return:      N/A
  placeBetHandler() {
    this.error = ""
    
    // if the amount inputted is null or undefined, an error is displayed
    if (this.amountInput === null || this.amountInput === undefined) {
      this.error = "Invalid amount entered"
    }
    // else, attempts an http request to place the bet
    else {
      this.betService.placeBet(this.matchInfo!.id, this.amountInput!, this.firstTeamSelected)
        .subscribe({
          next: (res) => this.router.navigate(['bets']),
          error: (err) => this.error = err.error
        })
    }
  }
}
