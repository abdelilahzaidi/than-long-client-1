import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/users/user.service';


@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {


  response$ :any;
  constructor(private fb : FormBuilder, private userService : UserService){}
  userForm : FormGroup = this.fb.group({
    first_name:[''],
    last_name:[''],
    gender:[''],
    email:[''],
    adress:[''],
    birthDate:[''],
    actif:[''],
    gsm:[''],
    grade:[''],
    status:['']
  })
  ngOnInit(){

  }

  async submit() {
    console.log('user / submit', this.userForm.value);

    this.userService.createUser(this.userForm.value)
      .subscribe(
        (res) => {
          console.log('Réponse du serveur :', res);
          this.response$ = res; // Si vous avez besoin de stocker la réponse
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la requête :', error);
          // Traitez l'erreur comme vous le souhaitez ici
        }
      );
  }



}
