import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000/api';

  // Declare empty list of users
  users: any[] = [];
  user: any;

  constructor(private http: HttpClient) { }

  // Angular 2 Life Cycle event when component has been initialized
  ngOnInit() {
    this.getAllUsers();
  }

  // Add one user to the API
  public addUser(name, age) {
    this.http.post(`${this.API}/users`, { name, age })
      .subscribe(() => {
        this.getAllUsers();
      });
  }

  // Get all users from the API
  public getAllUsers() {
    this.http.get(`${this.API}/users`)
      .subscribe((users: any) => {
        this.users = users;
      });
  }

  // Find 1 user by ID

  public findUser(id) {
    this.http.get(`${this.API}/users/${id}`).subscribe((user) => {
      this.user = user;
    });
  }

  // Delete 1 user by ID
  public removeUser(id) {
    this.http.delete(`${this.API}/users/${id}`).subscribe((user) => {
      this.user = user;
      this.getAllUsers();
    });
  }

}
