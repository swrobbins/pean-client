import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // Declare empty list of users
  users: any[] = [];
  user: any;
  userProfile = this.fb.group({
    firstName: ['Doug', Validators.required],
    lastName: ['Wilson', Validators.required],
    dateOfBirth: ['1965-12-17'],
    mobile: ['443-974-7038', [Validators.required, Validators.minLength(12)]],
    email: ['dougwilson65@gmail.com'],
    address: this.fb.group({
      street: ['6078 Wild Ginger Ct.'],
      city: ['Columbia'],
      state: ['MD'],
      zip: ['21044']
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  // Angular 2 Life Cycle event when component has been initialized
  ngOnInit() {
    this.getAllUsers();
  }

  get f() { return this.userProfile.controls; }

  // Add one user to the API
  public addUser() {
    console.log(this.f.mobile.value);
    this.http.post(`/api/users`, { user: this.userProfile.value })
      .subscribe(() => {
        this.getAllUsers();
      });
  }

  // Get all users from the API
  public getAllUsers() {
    this.http.get(`/api/users`)
      .subscribe((users: any) => {
        this.users = users;
      });
  }

  // Find 1 user by ID

  public findUser(id) {
    this.http.get(`/api/users/${id}`).subscribe((user) => {
      this.user = user;
    });
  }

  // Delete 1 user by ID
  public removeUser(id) {
    this.http.delete(`/api/users/${id}`).subscribe(() => {
      this.getAllUsers();
    });
  }

}
