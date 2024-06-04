import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '@angular/fire/auth';
import { Preferences } from '@capacitor/preferences';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly user = new ReplaySubject<any>(null);
  readonly loggedUser = this.user.asObservable();
  private islogged = false;

  constructor(
    private ngFireAuth: AngularFireAuth,
    private httpClient: HttpClient,
  ) {
    //this.user.next({ displayName: 'Guille', email: 'guille@mail.com' });
  }

  async registerUser(email: string, password: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(
      email,
      password,
    );
  }

  async setLocalStorageUser(theuser : User) {
    await Preferences.set({
      key: STORAGE_KEYS.USER,
      value: JSON.stringify(theuser),
    });
    //this.user.next({displayName: theuser.displayName, email: theuser.email})
    console.log("datos guardados como: " + theuser.displayName + " y " + theuser.email)
  
    }

  async getLocalStorageUser(): Promise<User> {
    const { value } = await Preferences.get({ key: STORAGE_KEYS.USER });
    console.log("I'm getting the localStorage user: " + value)
    return JSON.parse(value);
  }

  getToken(user: User) {
    const token = this.httpClient.get<any>(JSON.stringify(user));
    localStorage.setItem('access_token', '');
    return 'Bearer ' + token;
  }

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
    await Preferences.clear();
    await this.ngFireAuth.signOut();
    console.log("Preferencias LIMPIADAS");
    this.islogged = false;
    window.location.reload();
  }

  async getProfile() {
    return await this.ngFireAuth.currentUser;
  }
  isAuthenticated(): boolean {
    return this.islogged;
  }
  setAuth(){
    this.islogged = true;
  }

  //FOR THE INTERCEPTORS

  createHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('access_token'),
      }),
    };
  }
  //---------------------------------------------------------------
}

export enum STORAGE_KEYS {
  USER = 'currentUser',
}