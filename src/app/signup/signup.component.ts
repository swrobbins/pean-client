import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData = {username: '', password: ''};
  message = '';

  constructor(private http: HttpClient, private router: Router) {
  }

  signup() {
    this.http.post('/api/signup', this.signupData).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['signin']);
    }, err => {
      this.message = err.error.msg;
    });
  }
}
