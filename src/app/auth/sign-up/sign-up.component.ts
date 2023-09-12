import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  response$ :any;
  constructor(private fb : FormBuilder, private authService : AuthService,private router: Router){}
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
    status:[''],
    password:[''],
    password_confirm:['']

  })
  ngOnInit(){

  }

  async submit() {
    console.log('user / submit', this.userForm.value);

    this.authService.signupUser(this.userForm.value)
      .subscribe(
        (res:any) => {
          console.log('Réponse du serveur :', res);
          this.response$ = res; // Si vous avez besoin de stocker la réponse          
          this.router.navigate(['auth/signin'])      
         
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la requête :', error);
          // Traitez l'erreur comme vous le souhaitez ici
        }
      );
  }

}



