import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { catchError, map, of } from "rxjs";
import { AuthService } from "../auth/services/auth.service";


@Injectable()
export class AuthGuardAdmin implements CanActivate {
    constructor(private authService: AuthService,
        private router: Router
        ) {}

        //Verifier que le user est un admin
        isLoggedIn() {
            console.log("pass")
            let token: any = window.localStorage.getItem('token')
                return this.authService.verifiedUser(token).pipe(
                    map(res => {
                        console.log(res)
                        if (res.status === "admin") {
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

    canActivate() {
      return this.isLoggedIn()
    }
}
