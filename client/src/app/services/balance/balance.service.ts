import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient) { }



  // Function:    getUserBalance()
  // Description: attempts to get the balance of the current user
  // Parameters:  N/A
  // Return:      an observable containing the response from the server
  getUserBalance(): Observable<string> {
    const headers: HttpHeaders = new HttpHeaders({ 'Authorization' : `${localStorage.getItem(environment.loginTokenName)}` })

    return this.http.get(
      `${environment.baseAPIURL}/users/balance`,
      {responseType: 'text', headers}
    )
  }



  // Function:    deposit()
  // Description: attempts to make a deposit into the user's account
  // Parameters:  amountToDeposit: specifies the amount to deposit
  // Return:      an observable with the response from the server
  deposit(amountToDeposit: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'Authorization' : `${localStorage.getItem(environment.loginTokenName)}` })

    return this.http.post(
      `${environment.baseAPIURL}/users/deposit`,
      { amount: amountToDeposit },
      {responseType: 'text', headers}
    )
  }



  // Function:    withdraw()
  // Description: attmepts to make a withdraw from the user's account
  // Parameters:  amountToWithdraw: specifies the amount to withdraw
  // Return:      an observable with the response from the server
  withdraw(amountToWithdraw: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'Authorization' : `${localStorage.getItem(environment.loginTokenName)}` })

    return this.http.post(
      `${environment.baseAPIURL}/users/withdraw`,
      { amount: amountToWithdraw },
      {responseType: 'text', headers}
    )
  }
}
