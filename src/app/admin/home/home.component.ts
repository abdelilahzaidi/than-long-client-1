import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  showUser=false;
  showUserList = false;
  showTeamList = false;
  showRoleList = false;
  // Déclarez des tableaux pour stocker les données des utilisateurs, des équipes, etc.
  userList: string[] = [];
  teamList: any[] = [];
  roleList: any[] = [];
  user: any;
  users: any[] = [];
  role: any;
  roles: any[] = [];

  errorMessage!: string;
  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  response$: any;

  currentAction!: string;
  ngOnInit(): void {
    this.httpClient
      .get<any[]>('http://localhost:3001/auth/user')
      .subscribe((data) => {
        this.user = data;
      });
    this.getUser();

  }

  userForm: FormGroup = this.fb.group({
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
  apiUrl = 'http://localhost:3001';
  getUser() {
    return this.httpClient.get(this.apiUrl + '/user').subscribe({
      next: (data) => {
        this.users = data as [];
        console.log('user', this.user);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getRole() {
    return this.httpClient.get(this.apiUrl + '/role').subscribe({
      next: (data) => {
        this.roles = data as [];
        console.log('role', this.role);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  getTeam() {
    return this.httpClient.get(this.apiUrl + '/role').subscribe({
      next: (data) => {
        this.roles = data as [];
        console.log('role', this.role);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // async createUser() {
  //   this.showDivCreateUser =true
  // }
  // async submit() {
  //   console.log('user / submit', this.userForm.value);

  //   this.userService.createUser(this.userForm.value)
  //     .subscribe(
  //       (res) => {
  //         console.log('Réponse du serveur :', res);
  //         this.response$ = res; // Si vous avez besoin de stocker la réponse
  //       },
  //       (error) => {
  //         console.error('Une erreur s\'est produite lors de la requête :', error);
  //         // Traitez l'erreur comme vous le souhaitez ici
  //       }
  //     );
  // }

  doLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['auth/login']);
    console.log('logout');
  }

  getUserById(u:any){
    this.userService.getUserById(u.id).subscribe({
      next: (data) => {
        this.user=data
        //this.showUser =!this.showUser;
        console.log("id",this.user.id," ",u.id)
        if(!this.user.id !==u.id){
          this.showUser =true;
        }
      },
      error: (err) => {
        this.errorMessage = err.error;
      },
    })
    console.log("Hello")


  }

  handleDeleteUser(u: any) {
    let conf = confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
    if (conf == false) return;
    this.currentAction = 'handleDeleteUser';
    this.userService.deleteUser(u.id).subscribe({
      next: (data) => {
        let index = this.users.indexOf(u);
        this.users.splice(index, 1);
      },
      error: (err) => {
        this.errorMessage = err.error;
      },
    });
  }

  handleEditUser(u: any) {
    console.log(u.id);
    this.router.navigateByUrl('user-edit');
  }
  showUsers() {
    this.httpClient
      .get<any[]>('http://localhost:3001/user')
      .subscribe((data) => {
        // Assurez-vous que 'data' contient les données réelles des utilisateurs
        this.userList = data;
        this.showUserList = !this.showUserList;
        this.showTeamList = false;
        if(this.showUser===true){
          this.showUserList=false
          this.showUser=false
        }
      });
  }



  // ...

  showRoles() {
    console.log('Roles');
    this.httpClient
      .get<any[]>('http://localhost:3001/role')
      .subscribe((data) => {
        // Assurez-vous que 'data' contient les données réelles des rôles
        this.roleList = data;
        console.log('Roles', this.roleList);
        this.showRoleList = true;
        this.showUserList = false;
      });
  }

  showTeams() {
    this.httpClient
    .get<any[]>('http://localhost:3001/team')
    .subscribe((data) => {
      // Assurez-vous que 'data' contient les données réelles des rôles
      this.teamList = data;
      console.log('Team', this.teamList);
      this.showTeamList = true;
      this.showRoleList = false;
      this.showUserList = false;
    });
  }
}
