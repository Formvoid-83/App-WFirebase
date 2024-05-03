import { Injectable} from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
   CollectionReference,
   DocumentData,
   addDoc,
   collection,
   deleteDoc,
   doc,
   updateDoc,
 } from '@firebase/firestore';
 import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   user : User;
   getUser() : Observable<User>{
      const userT = of(this.user)
      return userT;
   }



  constructor(public ngFireAuth: AngularFireAuth) { 
   }

   async registerUser(email: string, password: string){
      return await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
   }

   async logginUser(email: string, password: string){
      this.user = (await this.ngFireAuth.signInWithEmailAndPassword(email,password)).user;
      return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
   }

  

   async resetPassword(email : string){
      return await this.ngFireAuth.sendPasswordResetEmail(email);
   }

   async signOut(){
      return await this.ngFireAuth.signOut();
   }

   async getProfile(){
      return await this.ngFireAuth.currentUser;
   }


  /* setUserName(userName){
      this.userName = userName;
      console.log(this.userName);
   }
   getUserName(){
      console.log(this.userName);
      return this.userName;
      
   }*/
   
}


