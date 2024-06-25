import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import firebase from 'firebase/compat/app'; 


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  user$: Observable<firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log("So this is just a role named: " + user.uid)
          return this.afs.doc<firebase.User>(`users/${user.uid}`).valueChanges();
          
        } else {
          return of(null);
        }
      }),
      
    );
  }
}
