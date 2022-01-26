import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Match } from 'src/app/interfaces/Match';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }



  // Function:    getMatches()
  // Description: sends a request to get all matches from the backend
  // Parameters:  N/A
  // Return:      an observable with the list of matches gathered
  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${environment.baseAPIURL}/matches`)
  }



  // Function:    getMatchById()
  // Description: sends a request to get a match specified by the id
  // Parameters:  N/A
  // Return:      an observable with the match gathered
  getMatchById(matchId: number): Observable<Match> {
    return this.http.get<Match>(`${environment.baseAPIURL}/matches/${matchId}`)
  }
}
