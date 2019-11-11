import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  jwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient) { }

  registerUser(user){
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.httpClient.post('http://localhost:3000/users/register', user, {headers: headers})
            .pipe(map(res => res));
  }

  authenticateUser(user){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post('http://localhost:3000/users/authenticate', user, {headers: headers})
            .pipe(map(res => res));
  }

  getProfile(){
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.authToken});
    this.loadToken();
    return this.httpClient.get('http://localhost:3000/users/profile', {headers: headers})
            .pipe(map(res => res));
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;

  }

  loggedIn(){
    return !(this.jwtHelperService.isTokenExpired(this.authToken));
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
