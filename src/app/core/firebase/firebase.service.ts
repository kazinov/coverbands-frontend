import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { environment } from '../../../environments/environment';
import { FirebaseApp, FirebaseAuth } from '@core/firebase/firebase.model';

export interface FirebaseOptions {
  [key: string]: any;
}

@Injectable()
export class FirebaseService {
  private appInstance: FirebaseApp = firebase.initializeApp(environment.firebase);
  private authInstance: FirebaseAuth = this.appInstance.auth();

  get app() {
    return this.appInstance;
  }

  get auth() {
    return this.authInstance;
  }

  constructor() {
  }
}