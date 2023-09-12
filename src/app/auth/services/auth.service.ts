import {HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:3001'

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient) { }

  userLogIn (user: any) {
    return this.http.post(this.apiUrl + '/auth/login', user)
  }

  signupUser(user: any) {
    return this.http.post(this.apiUrl + '/auth/register', user)
  }

  getAuthToken() {
    return window.localStorage.getItem('token')
  }

  verifiedUser(token : string) {
    return this.http.get<any>(this.apiUrl + '/auth/user')
  }

  
 
}


