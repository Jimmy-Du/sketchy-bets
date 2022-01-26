import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from 'src/app/interfaces/Match';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  @Input() match?: Match

  constructor(private router: Router) { }

  ngOnInit(): void {
  }



  // Function:    matchClickHandler()
  // Description: called upon when a user clicks on a match card and will
  //              navigate them to the match page where they can place their bets
  // Parameters:  matchId: the id of match to be navigated to
  // Return:      N/A
  matchClickHandler(matchId: number) {
    this.router.navigate([`/matches/${matchId}`])
  }
}
