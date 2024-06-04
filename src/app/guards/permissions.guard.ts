import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {
  constructor(private authService: AuthenticationService)
  {}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isAuthenticated())
      return  true;
    
    //Redirect
    alert('You dont shave permissions');
    return false;
  }

}
