import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';

import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';
import { BehaviorSubject, Observable } from 'rxjs';

import { auth } from 'firebase/app';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

const USER_KEY = 'userCache';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  userData: any;

  public msg = new BehaviorSubject<string>(null);
  public user = new BehaviorSubject<string>(null);

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem(USER_KEY, JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem(USER_KEY));
      } else {
        localStorage.setItem(USER_KEY, null);
        JSON.parse(localStorage.getItem(USER_KEY));
      }
      this.setUserData(user);
    })
  }

  //USER HANDLER

  _startUserWith(user: any) {
    this.user.next(user);
  }
  setUserData(user: any) {
    this.user.next(user);
  }
  clearUserData() {
    this.user.next(null);
  }
  getUserData(): Observable<any> {
    return this.user.asObservable();
  }

  //MSG HANDLER

  _startAuthStatusWith(msg: any) {
    this.msg.next(msg);
  }
  setAuthStatusData(msg: any) {
    this.msg.next(msg);
  }
  clearAuthStatusData() {
    this.msg.next(null);
  }
  getAuthStatusData(): Observable<any> {
    return this.msg.asObservable();
  }

  signIn(user: any) {
    this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.setAuthStatusData("You have been successfully logged in.")
        // console.log(result.user)
        //  this.router.navigate(['<!-- enter your route name here -->']);
      }).catch((error) => {
        this.setAuthStatusData(error.message)
      })
  }

  signUp(proffessional: any) {
    const proffessionalRef: AngularFirestoreDocument<any> = this.afs.doc(`professionals/${proffessional.id}`);
    const proffessionalData = {
      viewed: false,
      processed: false,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    }
    proffessionalRef.set(Object.assign(proffessional.data, proffessionalData), {
      merge: true
    }).then(data => {
      this.setAuthStatusData('a okay');
    }).catch((error) => {
      this.setAuthStatusData(error.message);
    })
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  
  googleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  
  AuthLogin(provider) {
    this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.setAuthStatusData("You have been successfully logged in.")
        // this.SetUserData(result.user);
      }).catch((error) => {
        this.setAuthStatusData(error)
      })
  }

  // SetUserData(user) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  //   const userData = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified
  //   }
  //   return userRef.set(userData, {
  //     merge: true
  //   })
  // }

  signOut() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem(USER_KEY);
      this.router.navigate(['/']);
    })
  }

}
