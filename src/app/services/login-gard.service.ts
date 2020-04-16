import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from "rxjs";
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable()
export class LoginGuard implements CanActivate {

 public loggedUser

  constructor(private readonly router: Router,
              private storage: StorageMap) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return !!localStorage.getItem('loggedUser')
    }
}
