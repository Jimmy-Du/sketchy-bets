import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }



  // Function:    toggleLinks()
  // Description: called upon when the user clicks the show links button on mobile devices
  //              and will display the navbar links
  // Parameters:  $event: info about the event that invoked the function
  // Return:      N/A
  toggleLinks($event: any) {
    const links = $event.target.nextElementSibling
    links.classList.toggle('active')
  }



  // Function:    logoutHandler()
  // Description: called upon when the user clicks the "Sign Out" button, will then
  //              attempt to log out the user
  // Parameters:  N/A
  // Return:      N/A
  logoutHandler() {
    this.auth.logoutUser()
    this.router.navigate(['sign-in'])
  }
}
