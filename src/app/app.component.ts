import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-th';
  user : any

 

  constructor(
    private modalService: NgbModal,
    private authService : AuthService,
    private router: Router
    ) {

    if (this.authService.getAuthToken()) {
      this.getUser()
    }

  }

  isLoggedIn() : boolean {
    return !!this.authService.getAuthToken()
  }

  private getUser() {
    this.authService.verifiedUser("").subscribe((data) => {
      this.user = data
    })
  }

  public open(modal: any): void {

    this.modalService.open(modal);

  }

  doLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['auth/login']);
    console.log('logout')
  }
}
