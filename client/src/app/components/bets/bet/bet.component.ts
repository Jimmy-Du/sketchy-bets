import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bet } from 'src/app/interfaces/Bet';
import { BetService } from 'src/app/services/bet/bet.service';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {
  @Input() bet?: Bet
  potentialReward: number = 0.00
  error: string = ""

  constructor(private betService: BetService, private router: Router) { }

  ngOnInit(): void {
    // if the match for the bet has not been completed yet, the potential reward is calculated for the bet
    if (!this.bet!.winLoseAmount) {
      // if the current selected team for the bet is the first team, the first team's odds are used
      // to calculate the potential rewards
      if (this.bet!.selectedFirstTeam) {
        this.potentialReward = this.bet!.amount * this.bet!.match.firstTeamOdds
      }
      // else  the second team's odds are used to calculate the potential rewards
      else {
        this.potentialReward = this.bet!.amount * this.bet!.match.secondTeamOdds
      }
    }
  }



  // Function:    cancelBetHandler()
  // Description: called upon when the user clicks the "Cancel" button and will
  //              attempt to delete the desired bet
  // Parameters:  id: the id of the bet to be canceled
  // Return:      N/A
  showDetailsClick($event: any) {
    const content = $event.target.nextElementSibling

    // if the bet details are currently displayed, they will become hidden
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    }
    // else, the bet details are displayed
    else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }



  // Function:    cancelBetHandler()
  // Description: called upon when the user clicks the "Cancel" button and will
  //              attempt to delete the desired bet
  // Parameters:  id: the id of the bet to be canceled
  // Return:      N/A
  cancelBetHandler(id: number) {
    // displays a confrimation to confirm if the bet is desired to be deleted, if 
    // the user selects "OK" the bet will be deleted
    if (confirm("Are you sure you would like to cancel the selected bet?")) {
      this.betService.deleteBet(id)
        .subscribe({
          next: () => window.location.reload(),
          error: (err) => {
            // if the returned status code is 403, the user is sent to the sign-in page to
            // sign back in
            if (err.status === 403) {
              this.router.navigate(['sign-in'])
            }
            // else, the error message is displayed to the user
            else {
              this.error = err.error
            }
          }
        })
    }
  }



  // Function:    changeTeamHandler()
  // Description: called upon when the user clicks the "Change Team" button and
  //              attempts to change the selected team of the bet
  // Parameters:  id: the id of the match to change the selected team
  // Return:      N/A
  changeTeamHandler(id: number) {
    this.betService.changeBet(id)
      .subscribe({
        next: (res) => window.location.reload(),
        error: (err) => {
          // if the returned status code is 403, the user is sent to the sign-in page to
          // sign back in
          if (err.status === 403) {
            this.router.navigate(['sign-in'])
          }
          // else, the error message is displayed to the user
          else {
            this.error = err.error
          }
        }
      })
  }
}
