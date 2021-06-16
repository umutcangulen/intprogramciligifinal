import { KiraComponent } from './components/Kira/Kira.component';
import { AracDialogComponent } from './components/dialogs/Arac-dialog/Arac-dialog.component';
import { MusterikiraComponent } from './components/musterikira/musterikira.component';
import { ArackiraComponent } from './components/arackira/arackira.component';
import { MusteriDialogComponent } from './components/dialogs/Musteri-dialog/Musteri-dialog.component';
import { KiralayanDialogComponent } from './components/dialogs/Kiralayan-dialog/Kiralayan-dialog.component';
import { AracComponent } from './components/Arac/Arac.component';
import { MusteriComponent } from './components/Musteri/Musteri.component';
import { KiralayanComponent } from './components/Kiralayan/Kiralayan.component';
import { ApiService } from './services/api.service';

import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ArackiraDialogComponent } from './components/dialogs/arackira-dialog/arackira-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    KiralayanComponent,
    MusteriComponent,
    AracComponent,
    ArackiraComponent,
    MusterikiraComponent,
    KiraComponent,



    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    KiralayanDialogComponent,
    ArackiraDialogComponent,
    AracDialogComponent,
    MusteriDialogComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    KiralayanDialogComponent,
    AracDialogComponent,
    MusteriDialogComponent,

  ],
  providers: [MyAlertService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
