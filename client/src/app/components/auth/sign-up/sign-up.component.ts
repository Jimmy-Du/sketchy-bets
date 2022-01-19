import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  emailInput: string = ""
  passwordInput: string = ""
  error: string = ""

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }



  // Function:    signUpHandler()
  // Description: called upon when the user clicks the "Sign Up" button, will then
  //              make a request to sign up a new user
  // Parameters:  N/A
  // Return:      N/A
  signUpHandler(): void {
    // clears any previous errors
    this.error = ""

    // sends request to register the user
    this.authService.registerUser(this.emailInput, this.passwordInput)
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => this.error = err.error
      })
  }
}
