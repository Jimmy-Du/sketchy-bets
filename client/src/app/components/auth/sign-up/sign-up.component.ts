import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  emailInput: string = ""
  passwordInput: string = ""
  error: string = ""
  isLoading: boolean = false

  constructor(private authService: AuthService, private router: Router) { }

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
    this.isLoading = true

    // sends request to register the user
    this.authService.registerUser(this.emailInput, this.passwordInput)
      .subscribe({
        next: (res) => {
          this.isLoading = false
          this.router.navigate(['sign-in']) 
        },
        error: (err) => {
          this.isLoading = false
          this.error = err.error
        }
      })
  }
}
