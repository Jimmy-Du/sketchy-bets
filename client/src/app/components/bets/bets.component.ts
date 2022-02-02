import { Component, OnInit } from '@angular/core';
import { Bet } from 'src/app/interfaces/Bet';
import { BetService } from 'src/app/services/bet/bet.service';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit {
  bets: Bet[] = []

  constructor(private betService: BetService) { }

  ngOnInit(): void {
    this.betService.getBets()
      .subscribe({
        next: (bets) => {
          // sorts the bets by the starting date from earliest to latest
          this.bets = bets.sort((a, b) => {
            return new Date(a.match.matchDate).valueOf() - new Date(b.match.matchDate).valueOf()
          }).reverse()
        }
      })
  }

}
