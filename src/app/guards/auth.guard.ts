import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { catchError, map, of } from "rxjs";
import { AuthService } from "../auth/services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
        private router: Router
        ) {}

         //Verifie que le user est authentifier

         isLoggedIn() {
          let token: any = window.localStorage.getItem('token')

          if (!token) {
              this.router.navigate(['/auth/login'])
              return false
          } else {
              return this.authService.verifiedUser(token).pipe(
                  map(res => {
                      console.log(res)
                      if (res) {
                          return true
                      } else {
                          this.router.navigate(['/auth/login'])
                          return false
                      }
                  }),
                  catchError((err) => {
                      return of(false)
                  })
              )
          }
      }

    canActivate() {
      return this.isLoggedIn()
    }
}
