import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users$ :any
  private user={}
  constructor(private httpClient : HttpClient){}
  ngOnInit(){
    this.users$ = this.httpClient.get<any[]>('http://localhost:3001/user')

  }
  

}
