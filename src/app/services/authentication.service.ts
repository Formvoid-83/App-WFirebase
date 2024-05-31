import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject } from 'rxjs';
import { User, UserCredential } from '@angular/fire/auth';
import { Preferences } from '@capacitor/preferences';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly user = new Subject<User>();
  readonly loggedUser = this.user.asObservable();

  constructor(
    private ngFireAuth: AngularFireAuth,
    private httpClient: HttpClient,
  ) {}

  async registerUser(email: string, password: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(
      email,
      password,
    );
  }

  async setLocalStorageUser() {
    //localStorage.setItem("currentUser", JSON.stringify(this.getProfile()));

    await Preferences.set({
      key: 'currentUser',
      value: JSON.stringify(this.getProfile()),
    });
  }
  async getLocalStorageUser(): Promise<User> {
    //return JSON.parse(localStorage.getItem("currentUser"))

    const { value } = await Preferences.get({ key: 'currentUser' });
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
    return await this.ngFireAuth.signOut();
  }

  async getProfile() {
    return await this.ngFireAuth.currentUser;
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
