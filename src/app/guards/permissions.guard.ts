import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';
import { Paths } from '../pages/Paths';

/*@Injectable({
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

}*/
export const PermissionsGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if(authService.isAuthenticated())
    return  of(true);
  
  //Redirect
  alert('You dont have permissions');
  router.navigateByUrl(Paths.LANDING);
  return of(false);
};
