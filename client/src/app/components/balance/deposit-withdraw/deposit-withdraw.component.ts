import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BalanceService } from 'src/app/services/balance/balance.service';

@Component({
  selector: 'app-deposit-withdraw',
  templateUrl: './deposit-withdraw.component.html',
  styleUrls: ['./deposit-withdraw.component.css']
})
export class DepositWithdrawComponent implements OnInit {
  @Input() isDeposit: boolean = false
  amountInput?: number
  error: string = ""

  constructor(private balanceService: BalanceService, private router: Router) { }

  ngOnInit(): void {
  }



  // Function:    depositHandler()
  // Description: called upon when the user clicks the "Deposit" button and attempts
  //              to deposit the amount specified by the user
  // Parameters:  N/A
  // Return:      N/A
  depositHandler() {
    // clears any existing errors
    this.error = ""

    // if the amount entered to be deposit is not a valid number, an error is displayed
    if (this.amountInput === null || this.amountInput === undefined) {
      this.error = "Invalid amount entered."
    }
    // else, a request is made to deposit the specified amount
    else {
      this.balanceService.deposit(this.amountInput!)
        .subscribe({
          next: () => window.location.reload(),
          error: (err) => {
            // if the returned status code is 403, the user is sent to the sign-in page to
            // sign back in
            if (err.status === 403) {
              this.router.navigate(['sign-in'])
            }
            // else, the error message is displayed to the user
            else {
              this.error = err.error
            }
          }
        })
    }
  }



  // Function:    withdrawHandler()
  // Description: called upon when the user clicks the "Withdraw" button and attempts
  //              to withdraw the amount specified by the user
  // Parameters:  N/A
  // Return:      N/A
  withdrawHandler() {
    // clears any existing errors
    this.error = ""

    // if the amount entered to be deposit is not a valid number, an error is displayed
    if (this.amountInput === null || this.amountInput === undefined) {
      this.error = "Invalid amount entered."
    }
    // else, a request is made to withdraw the specified amount
    else {
      this.balanceService.withdraw(this.amountInput!)
        .subscribe({
          next: () => window.location.reload(),
          error: (err) => {
            // if the returned status code is 403, the user is sent to the sign-in page to
            // sign back in
            if (err.status === 403) {
              this.router.navigate(['sign-in'])
            }
            // else, the error message is displayed to the user
            else {
              this.error = err.error
            }
          }
        })
    }
  }
}
