import { Injectable } from '@angular/core';
import 'firebase/auth';
import 'firebase/firestore';
import { ReplaySubject } from 'rxjs';
import { FirebaseUserInfo } from '@core/firebase/firebase.model';
import { FirebaseService } from '@core/firebase/firebase.service';

@Injectable()
export class AuthService {
  private authStateSubject = new ReplaySubject<FirebaseUserInfo>();

  get authStateChanged$() {
    return this.authStateSubject.asObservable();
  }

  init() {
    this.firebaseService.auth.onAuthStateChanged(this.authStateSubject);
  }

  constructor(private firebaseService: FirebaseService) {
    this.init();
  }
}
