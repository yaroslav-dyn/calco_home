import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from "rxjs";

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this.router.navigate(['/signUp']);
    return sessionStorage.getItem('loggedUser') !== null;
  }

}

