import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { fUserEdit } from './edit.form';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  user :any
  response$: any;
  errorMessage: any;
  userEditForm: FormGroup = fUserEdit({})

  constructor(private userService: UserService, private router :Router, private $route: ActivatedRoute) {
    
  }
 
  ngOnInit() {
    this.$route.data.subscribe(({user}) => {
      this.user = user ;
      this.userEditForm = fUserEdit(user)
    })
  }

  handleUpdateUser() {
    console.log(this.user)
    this.userService.updateUser(this.user.id,this.userEditForm.value).subscribe({
      next : (data)=>{
        
        this.response$ = data;
        this.router.navigate(['admin-home']);
        alert("User has been successfully updated");
      }, error : err => {
        this.errorMessage=err;
      }
    })
  }



}
