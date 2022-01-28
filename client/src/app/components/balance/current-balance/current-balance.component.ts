import { Component, OnInit } from '@angular/core';
import { BalanceService } from 'src/app/services/balance/balance.service';

@Component({
  selector: 'app-current-balance',
  templateUrl: './current-balance.component.html',
  styleUrls: ['./current-balance.component.css']
})
export class CurrentBalanceComponent implements OnInit {
  currentBalance?: number

  constructor(private balanceService: BalanceService) { }

  ngOnInit(): void {
    this.balanceService.getUserBalance().subscribe({
      next: (res) => this.currentBalance = Number(res)
    })
  }

}
