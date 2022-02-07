import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ButtonComponent } from './components/common/button/button.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { MatchesComponent } from './components/matches/matches.component';
import { MatchComponent } from './components/matches/match/match.component';
import { MatchByIdComponent } from './components/matches/match-by-id/match-by-id.component';
import { BalanceComponent } from './components/balance/balance.component';
import { DepositWithdrawComponent } from './components/balance/deposit-withdraw/deposit-withdraw.component';
import { CurrentBalanceComponent } from './components/balance/current-balance/current-balance.component';
import { PlaceBetComponent } from './components/matches/match-by-id/place-bet/place-bet.component';
import { BetsComponent } from './components/bets/bets.component';
import { BetComponent } from './components/bets/bet/bet.component';
import { TournamentPipe } from './pipes/tournament/tournament.pipe';
import { SpinnerComponent } from './components/common/spinner/spinner.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignUpComponent,
    ButtonComponent,
    SignInComponent,
    MatchesComponent,
    MatchComponent,
    MatchByIdComponent,
    BalanceComponent,
    DepositWithdrawComponent,
    CurrentBalanceComponent,
    PlaceBetComponent,
    BetsComponent,
    BetComponent,
    TournamentPipe,
    SpinnerComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
