import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';


import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { IonicModule } from '@ionic/angular';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
    {provide: FIREBASE_OPTIONS,useValue: environment.firebase},
    importProvidersFrom(IonicModule.forRoot()),
    provideRouter(routes),
    /*importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
    importProvidersFrom(provideAnalytics(() => getAnalytics())),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),*/
    //Interceptors
    provideHttpClient(),
    ScreenTrackingService,
    UserTrackingService, provideFirebaseApp(() => initializeApp({"projectId":"auth-example-eb1c2","appId":"1:955502368398:web:a9924d9660aa38559f5bdf","storageBucket":"auth-example-eb1c2.appspot.com","apiKey":"AIzaSyBqnjK-NF_GiX_zAgqAxdolkP5EBAkFeWs","authDomain":"auth-example-eb1c2.firebaseapp.com","messagingSenderId":"955502368398","measurementId":"G-YWJJS10H4N"})), provideFirestore(() => getFirestore()), provideMessaging(() => getMessaging()), provideStorage(() => getStorage()),
  ],
});
