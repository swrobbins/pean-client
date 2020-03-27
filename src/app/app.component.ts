import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  // Declare empty list of people
  people: any[] = [];
  person: any

  constructor(private http: HttpClient) { }

  // Angular 2 Life Cycle event when component has been initialized
  ngOnInit() {
    this.getAllPeople();
  }

  // Add one person to the API
  public addPerson(name, age) {
    this.http.post(`${this.API}/users`, { name, age })
      .subscribe(() => {
        this.getAllPeople();
      })
  }

  // Get all users from the API
  public getAllPeople() {
    this.http.get(`${this.API}/users`)
      .subscribe((people: any) => {
        this.people = people
      })
  }

  // Find 1 person by ID

  public findPerson(id) {
    this.http.get(`${this.API}/users/${id}`).subscribe((person) => {
      this.person = person
    })
  }
}