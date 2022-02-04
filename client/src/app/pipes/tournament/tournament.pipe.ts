import { Pipe, PipeTransform } from '@angular/core';
import { Match } from 'src/app/interfaces/Match';

@Pipe({
  name: 'tournament'
})
export class TournamentPipe implements PipeTransform {

  transform(matches: Match[], tournament: string): Match[] {
    return matches.filter(match => match.tournament === tournament)
  }

}
