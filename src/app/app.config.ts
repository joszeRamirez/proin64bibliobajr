import { ApplicationConfig, InjectionToken, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  
  providers: [provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
  provideAnimationsAsync(),
  importProvidersFrom(HttpClientModule),
  provideFirebaseApp(() => initializeApp({ "projectId": "proinbibliobajr", "appId": "1:361693218964:web:bab0063df972739b824c81", "storageBucket": "proinbibliobajr.appspot.com", "apiKey": "AIzaSyDHDZGWBN2k86yVFP7puktEVvuepCeGE5w", "authDomain": "proinbibliobajr.firebaseapp.com", "messagingSenderId": "361693218964" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideAnimationsAsync()

  ]
};
