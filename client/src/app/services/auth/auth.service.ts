import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean = false

  constructor(private http:HttpClient) { }



  // Function:    registerUser()
  // Description: sends a request to the api to register a new user
  // Paramters:   email: the email of the new user
  //              password: the password of the new user
  // Return:      an observable of the return of the sign up request
  registerUser(email: string, password: string): Observable<any> {
    return this.http.post(
      `${environment.baseAPIURL}/users/register`, 
      {email: email, password: password},
      {responseType: 'text'}
    )
  }

  

  // Function:    loginUser()
  // Description: sends a request to the api to log in the user
  // Paramters:   email: the email of the user
  //              password: the password of the user
  // Return:      an observable of the return of the log in request
  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(
      `${environment.baseAPIURL}/login`, 
      {email: email, password: password},
      {observe: "response"}
    )
  }



  // Function:    checkIfLoggedIn()
  // Description: checks localstorage for a valid login token
  // Paramters:   N/A
  // Return:      boolean that indicates if the user is logged in or not
  checkIfLoggedIn(): boolean {
    let validLogin: boolean = false
    let loginToken: string | null = localStorage.getItem(environment.loginTokenName)

    // if a token is present, the expiration time is checked to see if it is still valid
    if (loginToken) {
      const decodedToken = jwt_decode<any>(loginToken)
      const currentTime = Date.now() / 1000
    
      // if the expiration time of the token is less than the current time,
      // the token is invalid and will be deleted
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem(environment.loginTokenName)
      }
      // else, the user is set to currently logged in
      else {
        validLogin = true
      }
    }

    this.loggedIn = validLogin
    return validLogin
  }



  // Function:    logoutUser()
  // Description: removes login token from localstorage and logs out the current user
  // Paramters:   N/A
  // Return:      N/A
  logoutUser() {
    localStorage.removeItem(environment.loginTokenName)
    this.loggedIn = false
  }
}
