import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { SignUpAndInGuard } from './guards/sign-up-and-in/sign-up-and-in.guard';

const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent, canActivate: [SignUpAndInGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [SignUpAndInGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
