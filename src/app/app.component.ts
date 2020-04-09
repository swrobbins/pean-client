import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private authService: AuthService, public router: Router) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        if (!this.authService.isAuthenticated()) {
          this.authService.validate().then(response => {
            this.authService.setProfile(response);
          });
        }
      }
    });
  }

  signin() {
    this.router.navigate(['signin']);
  }

  signout() {
    this.authService.signout().then(() => {
      this.authService.removeProfile();
      this.router.navigate(['home']);
    });
  }

  showSignOut() {
    return this.authService.isAuthenticated();
  }

  showSignIn() {
    return !this.authService.isAuthenticated() && this.router.url !== '/signin';
  }
}

