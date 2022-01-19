import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  // Function:    registerUser()
  // Description: sends a request to the api to register a new user
  // Paramters:   email: the email of the new user
  //              password: the password of the new user
  // Return:      an observable of the return of the sign up request
  registerUser(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/users/register`, {email: email, password: password})
  }
}
