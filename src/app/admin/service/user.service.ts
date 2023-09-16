import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:3001';

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient) {}

  getUserById(id: any) {
    return this.http.get(this.apiUrl + '/user/' + id, {
      responseType: 'json',
    });
  }

  deleteUser(id: any) {
    return this.http.delete(this.apiUrl + '/user/' + id, {
      responseType: 'json',
    });
  }


 updateUser(id: any, product: any) {
  return this.http.patch(this.apiUrl + '/user/' + id, product)
}
}
