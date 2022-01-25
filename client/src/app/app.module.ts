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
    MatchByIdComponent
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
