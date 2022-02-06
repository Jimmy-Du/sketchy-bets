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
  tournaments: string[] = []

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

          this.tournaments = matches.map(item => item.tournament)
                              .filter((value, index, self) => self.indexOf(value) === index)
        }
      })
  }



  // Function:    toggleMatches()
  // Description: called upon when the user clicks on the tournament name and will toggle the
  //              matches of the tournament
  // Parameters:  $event: contains info about the event that called this function
  // Return:      N/A
  toggleMatches($event: any) {
    const content = $event.target.nextElementSibling

    if (content.style.display === "block" || content.style.display === "") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  }
}
