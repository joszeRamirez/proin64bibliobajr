import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"proinbibliobajr","appId":"1:361693218964:web:bab0063df972739b824c81","storageBucket":"proinbibliobajr.appspot.com","apiKey":"AIzaSyDHDZGWBN2k86yVFP7puktEVvuepCeGE5w","authDomain":"proinbibliobajr.firebaseapp.com","messagingSenderId":"361693218964"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideAnimationsAsync()]
};
