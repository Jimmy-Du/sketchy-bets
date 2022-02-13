import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  error: string = ""
  passwordInput: string = ""
  emailInput: string = ""
  isLoading: boolean = false

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }



  // Function:    signInHandler()
  // Description: called upon when the user clicks the "Sign In" button, will then
  //              attempt to log in the user
  // Parameters:  N/A
  // Return:      N/A
  signInHandler() {
    // clears out any existing errors
    this.error = ""
    this.isLoading = true

    this.auth.loginUser(this.emailInput, this.passwordInput)
      .subscribe({
        next: (res) => {
          this.isLoading = false

          localStorage.setItem(environment.loginTokenName, res.headers.get('Authorization'))
          this.auth.loggedIn = true
          this.router.navigate(['matches'])
        },
        error: (err) => {
          this.isLoading = false

          // if the status of response is 403, an "Incorrect Credentials" error is displayed
          if (err.status == 403) {
            this.error = "Incorrect Credentials"
          }
          // else, a server error is displayed
          else {
            this.error = "Something went wrong. Please try again later."
          }
        }
      })
  }
}
