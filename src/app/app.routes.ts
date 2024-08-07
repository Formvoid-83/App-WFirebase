import { Routes } from '@angular/router';
import { PermissionsGuard } from './guards/permissions.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'app',
    loadComponent: () => import('./app.component').then((m) => m.AppComponent),
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password.page').then( m => m.ResetPasswordPage)
  },
  {
    path: 'landing',
    loadComponent: () => import('./pages/landing/landing.page').then( m => m.LandingPage),
    //canActivate: [ONLY IF AUTH If not redirect to login]
  },
  {
    path: 'sell',
    loadComponent: () => import('./components/selling-page/selling-page.component').then( m => m.SellingPageComponent),
    canActivate: [PermissionsGuard]
  },
  {
    path: 'sell',
    loadComponent: () => import('./pages/sell/sell.page').then( m => m.SellPage)
  },

];
