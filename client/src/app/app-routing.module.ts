import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { MatchByIdComponent } from './components/matches/match-by-id/match-by-id.component';
import { MatchesComponent } from './components/matches/matches.component';
import { SignUpAndInGuard } from './guards/sign-up-and-in/sign-up-and-in.guard';

const routes: Routes = [
  { path: '', redirectTo: '/matches', pathMatch: 'full'},
  { path: 'matches', component: MatchesComponent },
  { path: 'matches/:matchId', component: MatchByIdComponent},
  { path: 'sign-up', component: SignUpComponent, canActivate: [SignUpAndInGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [SignUpAndInGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
