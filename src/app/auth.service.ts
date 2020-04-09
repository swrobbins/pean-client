import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userProfileKey = 'userProfile';

  constructor(private http: HttpClient) {
  }

  public isAuthenticated(): boolean {
    const userProfile = localStorage.getItem(this.userProfileKey);
    return userProfile ? JSON.parse(userProfile).isAuthenticated : false;
  }

  public getProfile() {
    const userProfile = localStorage.getItem(this.userProfileKey);
    return userProfile ? JSON.parse(userProfile).profile : {};
  }

  public getAuthenticationSource() {
    const userProfile = localStorage.getItem(this.userProfileKey);
    return userProfile ? JSON.parse(userProfile).authenticationSource : '';
  }

  public setProfile(userProfile) {
    localStorage.setItem(this.userProfileKey, JSON.stringify(userProfile));
  }

  public removeProfile() {
    localStorage.removeItem(this.userProfileKey);
  }

  public validate() {
    return this.http.get('/auth/isAuthenticated').toPromise();
  }

  public signin(signinData) {
    return this.http.post('/auth/local', signinData).toPromise();
  }

  public signout() {
    return this.http.get('/auth/signout').toPromise();
  }
}
