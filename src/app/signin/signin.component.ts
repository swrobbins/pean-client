import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  faGithub = faGithub;
  faGoogle = faGoogle;
  signinData = {username: '', password: ''};
  message = '';
  data: any;

  constructor(private authService: AuthService, private router: Router) {
  }
}
