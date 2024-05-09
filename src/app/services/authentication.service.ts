import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject } from 'rxjs';
import { User, UserCredential } from '@angular/fire/auth';
import Base64 from 'crypto-js/enc-base64';
import { FirebaseApp } from '@angular/fire/compat';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements HttpInterceptor {
  private readonly user = new Subject<User>();
  readonly loggedUser = this.user.asObservable();

  constructor(private ngFireAuth: AngularFireAuth, ) {}
//-------------------------------------------------------------------------------------------------
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    let token = localStorage.getItem("access_token");
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
//-----------------------------------------------------------------------------------------------------
  async registerUser(email: string, password: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(
      email,
      password,
    )
    
  }

  setLocalStorageUser() {
    localStorage.setItem("currentUser", JSON.stringify(this.getProfile()));
  }
  getLocalStorageUser(): User{
    return JSON.parse(localStorage.getItem("currentUser"))
  }
  getToken(user : User){
    const payload ={
      user_name: user.displayName,
      user_email: user.email
    }
    localStorage.setItem("access_token", JSON.stringify(user));
    return JSON.stringify(user);
  }
  
  /*async addNameToProfile( ,fullname: string){
    await  .updateProfile({
        displayName: fullname
      }).catch(function(error){
        console.log(error)
      })
    })
  }*/

  async loginUser(email: string, password: string): Promise<void> {
    const user = await this.ngFireAuth.signInWithEmailAndPassword(
      email,
      password,
    );
    if (user) {
      this.user.next(user.user);
    }
  }

  async resetPassword(email: string) {
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  async signOut() {
    return await this.ngFireAuth.signOut();
  }

  async getProfile() {
    return await this.ngFireAuth.currentUser;
  }
}
