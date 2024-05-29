import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import routes from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyDHDZGWBN2k86yVFP7puktEVvuepCeGE5w",
  authDomain: "proinbibliobajr.firebaseapp.com",
  projectId: "proinbibliobajr",
  storageBucket: "proinbibliobajr.appspot.com",
  messagingSenderId: "361693218964",
  appId: "1:361693218964:web:bab0063df972739b824c81"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())
  ]
};
