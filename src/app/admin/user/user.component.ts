import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  constructor(private httpClient : HttpClient, private authService : AuthService){}
  
user :any

ngOnInit(){
  this.httpClient.get<any[]>('http://localhost:3001/auth/user').subscribe((data) => {
    this.user = data
  })

}

}



  
