import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject } from 'rxjs';
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { User, UserCredential } from '@angular/fire/auth';
import { Preferences } from '@capacitor/preferences';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly user = new Subject<User>();
  readonly loggedUser = this.user.asObservable();
  private islogged = false;

  constructor(private ngFireAuth: AngularFireAuth, private httpClient : HttpClient) {}
  
  
  isAuthenticated(): boolean {
    return this.islogged;
  }
  setAuth(){
    this.islogged = true;
  }


  async registerUser(email: string, password: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(
      email,
      password,
    )
    
  }

  async setLocalStorageUser(theuser : User) {
    await Preferences.set({
      key: "currentUser",
      value: JSON.stringify(theuser)
    });
    //console.log(theuser.displayName);
    await Preferences.set({
      key: "userName",
      value: theuser.displayName
    });
  }
  async getLocalStorageUser(): Promise<User>{
    const {value} = await Preferences.get({key: "currentUser"})
    return JSON.parse(value);
  }
  async getLocalStorageUserName(): Promise<string>{
    const {value} = await Preferences.get({key: "userName"})
    console.log("Username is: " + value);
    return value ?? '';
  }
  /*async functionB(): Promise<string> {
    const value = await this.getLocalStorageUserName() // how to unwrap the value inside this  promise
    return value;
 }*/

  async loginUser(email: string, password: string): Promise<void> {
    const user = await this.ngFireAuth.signInWithEmailAndPassword(
      email,
      password,
    );
    if (user) {
      this.user.next(user.user);
      //For the Local Storage
      this.setLocalStorageUser(user.user);
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

  //FOR THE INTERCEPTORS

  createHeaders(){
    return {
      headers: new HttpHeaders({
        'Authorization' : localStorage.getItem("access_token")
      })
    }
  }
  //---------------------------------------------------------------
}
