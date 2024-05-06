import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';
import { User, UserCredential } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire/compat';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly user = new Subject<User>();
  readonly loggedUser = this.user.asObservable();

  constructor(private ngFireAuth: AngularFireAuth) {}

  async registerUser(email: string, password: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(
      email,
      password,
    )
    
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
