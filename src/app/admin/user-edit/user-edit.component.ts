import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  user :any
  response$: any;
  errorMessage: any;
  constructor(private fb: FormBuilder, private userService: UserService) {}
  userEditForm: FormGroup = this.fb.group({
    first_name: [''],
    last_name: [''],
    gender: [''],
    email: [''],
    adress: [''],
    birthDate: [''],
    actif: [''],
    gsm: [''],
    grade: [''],
    status: [''],
  });
  ngOnInit() {}

  // async submit() {
  //   console.log('user / submit', this.userForm.value);

  //   this.userService.createUser(this.userForm.value).subscribe(
  //     (res) => {
  //       console.log('Réponse du serveur :', res);
  //       this.response$ = res; // Si vous avez besoin de stocker la réponse
  //     },
  //     (error) => {
  //       console.error("Une erreur s'est produite lors de la requête :", error);
  //       // Traitez l'erreur comme vous le souhaitez ici
  //     }
  //   );
  // }

  handleUpdateUser() {
    this.userService.updateUser(this.user.id,this.userEditForm.value).subscribe({
      next : (data)=>{
        alert("Product has been successfully updated");
      }, error : err => {
        this.errorMessage=err;
      }
    })
  }



}
