import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../service/user.service";

export function userResolver(): ResolveFn<any> {
    return (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<any>|Promise<any>|any => {
        const userService = inject(UserService)
        const userId = route.paramMap.get("id")

        return userService.getUserById(userId)
      }
}