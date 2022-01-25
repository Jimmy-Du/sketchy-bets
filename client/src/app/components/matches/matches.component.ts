import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/interfaces/Match';
import { MatchService } from 'src/app/services/match/match.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: Match[] = []

  constructor(private matchService: MatchService) { }

  ngOnInit(): void {
    // retrieves all matches from the backend
    this.matchService.getMatches()
      .subscribe({
        next: (matches) => {
          // sorts the matches by the starting date from earliest to latest
          this.matches = matches.sort((a, b) => {
            return new Date(a.matchDate).valueOf() - new Date(b.matchDate).valueOf()
          })
        }
      })
  }
}
