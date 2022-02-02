import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bet } from 'src/app/interfaces/Bet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  constructor(private http: HttpClient) { }



  // Function:    placeBet()
  // Description: sends an http request to attempt to place a bet on the specified match
  // Parameters:  matchId: the id of the match to bet on
  //              amount: the amount to be placed on the bet
  //              betOnFirstTeam: a boolean that indicates if the bet is for the first team winning or not
  // Return:      an observable containing the response from the server
  placeBet(matchId: number, amount: number, betOnFirstTeam: boolean): Observable<string> {
    const headers: HttpHeaders = new HttpHeaders({ 'Authorization' : `${localStorage.getItem(environment.loginTokenName)}` })

    return this.http.post(
      `${environment.baseAPIURL}/bets`, 
      { matchId, amount, betOnFirstTeam},
      {
        responseType: 'text', 
        headers
      }
    )
  }



  // Function:    deleteBet()
  // Description: attempts to delete an existing bet
  // Parameters:  id: the id of the bet to be deleted
  // Return:      an observable containing the response from the server
  deleteBet(id: number): Observable<string> {
    const headers: HttpHeaders = new HttpHeaders({ 'Authorization' : `${localStorage.getItem(environment.loginTokenName)}` })

    return this.http.delete(
      `${environment.baseAPIURL}/bets/${id}`,
      {
        responseType: 'text', 
        headers
      }
    )
  }



  // Function:    changeBet()
  // Description: attempts to change the team selected of the bet
  // Parameters:  id: the id of the bet to be changed
  // Return:      an observable containing the response from the server
  changeBet(id: number) {
    const headers: HttpHeaders = new HttpHeaders({ 'Authorization' : `${localStorage.getItem(environment.loginTokenName)}` })

    return this.http.patch(
      `${environment.baseAPIURL}/bets/${id}/team`,
      {
        id
      },
      {
        responseType: 'text', 
        headers
      }
    )
  }



  // Function:    getBets()
  // Description: attempts to retrieve all the user's bets
  // Parameters:  N/A
  // Return:      an observable containing the response from the server
  getBets(): Observable<Bet[]> {
    const headers: HttpHeaders = new HttpHeaders({ 'Authorization' : `${localStorage.getItem(environment.loginTokenName)}` })

    return this.http.get<Bet[]>(
      `${environment.baseAPIURL}/bets`,
      {
        headers
      }
    )
  }
}
