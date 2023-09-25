import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';

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


 updateUser(id: any, user: any) {
  console.log('id',id)
  return this.http.put(this.apiUrl + '/user/' + id, {...user, grade: parseInt(user.grade)})
}
createUser(user: any) {
  console.log('In service angular',user)
  return this.http.post<any>(this.apiUrl+'/user',{...user, grade: parseInt(user.grade)})
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Une erreur s\'est produite lors de la requête :', error);
        return throwError(error);
      })
    );
}

}
