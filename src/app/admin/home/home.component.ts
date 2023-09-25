import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  showCourList=false
  showUser=false;
  showUserList = false;
  showTeamList = false;
  showProgramList = false;
  showCreateUserDiv=false;
  // Déclarez des tableaux pour stocker les données des utilisateurs, des équipes, etc.
  userList: string[] = [];
  teamList: any[] = [];
  programList: any[] = [];
  courList: any[] = [];
  user: any;
  users: any[] = [];
  program: any;
  programs: any[] = [];
  cours: any[] = [];
  userForm: FormGroup;
  errorMessage!: string;
  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      adress: [''], // Corrigez le nom de l'attribut "adress" en "address"
      birthDate: [''],
      actif: [false], // Utilisez un booléen pour actif
      gsm: [''],
      grade: ['', Validators.required],
      status: ['', Validators.required],
    })
  }










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
  //Declaration de l'url
  apiUrl = 'http://localhost:3001';
  //Logout
  doLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['auth/login']);
    console.log('logout');
  }


  //Liste tous les utilisateurs
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
  //Liste les programmes
  getProgram() {
    return this.httpClient.get(this.apiUrl + '/program').subscribe({
      next: (data) => {
        this.programs = data as [];
        console.log('program', this.program);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  // getTeam() {
  //   return this.httpClient.get(this.apiUrl + '/role').subscribe({
  //     next: (data) => {
  //       this.roles = data as [];
  //       console.log('role', this.role);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }





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
        //this.showCreateUserDiv=false;
          if(this.showCreateUserDiv===true){
          this.showUserList=false
          this.showUser=false;
          // this.showCreateUserDiv=false;
          // this.showCreateUserDiv=false;
        }
        // if(this.showUser===true){
        //   this.showUserList=false
        //   this.showUser=false;
        //   this.showCreateUserDiv=false;
        //   this.showCreateUserDiv=false;
        // }
      });
  }



  //Show Programm

  showPrograms() {
    console.log('Programs');
    this.httpClient
      .get<any[]>('http://localhost:3001/program')
      .subscribe((data) => {
        // Assurez-vous que 'data' contient les données réelles des rôles
        this.programList = data;
        console.log('Roles', this.programList);
        this.showProgramList = true;
        this.showUserList = false;
        this.showCreateUserDiv=false;
      });
  }

  // showTeams() {
  //   this.httpClient
  //   .get<any[]>('http://localhost:3001/team')
  //   .subscribe((data) => {
  //     // Assurez-vous que 'data' contient les données réelles des rôles
  //     this.teamList = data;
  //     console.log('Team', this.teamList);
  //     this.showTeamList = true;
  //     this.showRoleList = false;
  //     this.showUserList = false;
  //     this.showCreateUserDiv=false;



  //   });
  // }

  // showCours() {
  //   this.httpClient
  //   .get<any[]>('http://localhost:3001/cour')
  //   .subscribe((data) => {
  //     // Assurez-vous que 'data' contient les données réelles des rôles
  //     this.courList = data;
  //     console.log('Team', this.courList);

  //     this.showCourList = true;
  //     this.showTeamList = false;
  //     this.showRoleList = false;
  //     this.showUserList = false;
  //     this.showCreateUserDiv=false;
  //   });
  // }


  showCreateUser(){

    this.showCreateUserDiv=true;
    console.log('Hi')

  }




  createUser() {
    //
    this.router.navigateByUrl('/user-new')
  }
  }
