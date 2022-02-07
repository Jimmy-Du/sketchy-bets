import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { BalanceComponent } from './components/balance/balance.component';
import { BetsComponent } from './components/bets/bets.component';
import { MatchByIdComponent } from './components/matches/match-by-id/match-by-id.component';
import { MatchesComponent } from './components/matches/matches.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { AutoLoginGuard } from './guards/auto-login/auto-login.guard';
import { SignUpAndInGuard } from './guards/sign-up-and-in/sign-up-and-in.guard';

const routes: Routes = [
  { path: '', redirectTo: '/matches', pathMatch: 'full'},
  { path: 'matches', component: MatchesComponent, canActivate: [AutoLoginGuard] },
  { path: 'matches/:matchId', component: MatchByIdComponent, canActivate: [AuthGuard] },
  { path: 'balance', component: BalanceComponent, canActivate: [AuthGuard] },
  { path: 'bets', component: BetsComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [SignUpAndInGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [SignUpAndInGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
