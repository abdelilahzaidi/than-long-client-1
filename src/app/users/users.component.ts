import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  constructor(private httpClient : HttpClient, private router: Router){}

user :any

ngOnInit(){
  this.httpClient.get<any[]>('http://localhost:3001/auth/user').subscribe((data) => {
    this.user = data
  })

}

doLogout() {
  localStorage.removeItem('token');
  this.router.navigate(['auth/login']);
  console.log('logout');
}

}




