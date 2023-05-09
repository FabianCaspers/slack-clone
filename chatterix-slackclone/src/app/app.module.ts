import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ImprintComponent } from './components/imprint/imprint.component';
import { LoginComponent } from './components/login/login.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from './services/authentication.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './components/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';



@NgModule({
  declarations: [
    AppComponent,
    ImprintComponent,
    LoginComponent,
    PrivacyPolicyComponent,
    RegisterComponent,
    WelcomeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyA3gsn8fS4lYU1-u53eDkb_J3UhaexCM3I",
      authDomain: "slack-clone-c69b7.firebaseapp.com",
      projectId: "slack-clone-c69b7",
      storageBucket: "slack-clone-c69b7.appspot.com",
      messagingSenderId: "463616099616",
      appId: "1:463616099616:web:361eb3236f07c813e68345"
    }),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyA3gsn8fS4lYU1-u53eDkb_J3UhaexCM3I",
      authDomain: "slack-clone-c69b7.firebaseapp.com",
      projectId: "slack-clone-c69b7",
      storageBucket: "slack-clone-c69b7.appspot.com",
      messagingSenderId: "463616099616",
      appId: "1:463616099616:web:361eb3236f07c813e68345"
    })),
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatSidenavModule,
    MatMenuModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatIconModule,
    AngularFirestoreModule,
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
