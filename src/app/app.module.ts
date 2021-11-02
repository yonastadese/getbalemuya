import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainToolbarComponent } from './common/main-toolbar/main-toolbar.component';
import { MainFooterComponent } from './common/main-footer/main-footer.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeClientsComponent } from './pages/home/clients/clients.components';
import { HomeTestimoniesComponent } from './pages/home/testimonies/testimonies.components';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ServiceDialogComponent } from './common/service-dialog/service-dialog.component';

import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { CleanComponent } from './pages/services/clean/clean.component';
import { GardenerComponent } from './pages/services/gardener/gardener.component';
import { HandymanComponent } from './pages/services/handyman/handyman.component';
import { PlumberComponent } from './pages/services/plumber/plumber.component';
import { SecurityComponent } from './pages/services/security/security.component';

import { ElectricianComponent } from './pages/services/electrician/electrician.component';
import { RepairComponent } from './pages/services/repair/repair.component';
import { PaintingComponent } from './pages/services/painting/painting.component';
import { WelderComponent } from './pages/services/welder/welder.component';


import { MatNativeDateModule } from '@angular/material/core';

import { ImageUploadModule } from "angular2-image-upload";
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrderComponent, OrderDialog } from './pages/dashboard/order/order.component';
import { ComplaintComponentForm } from './common/complaint/complaint.form.component';
import { ComplaintComponent } from './pages/dashboard/complaint/complaint.component';
import { ComplaintDialog } from './pages/dashboard/complaint/complaint.component';
import { ProfessinalsComponent, ProfessionalDialog } from './pages/dashboard/professinals/professinals.component';

@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    MainFooterComponent,
    HomeComponent,
    HomeClientsComponent,
    HomeTestimoniesComponent,
    LoginComponent,
    RegisterComponent,
    ServiceDialogComponent,
    AboutComponent,
    ContactComponent,
    ForgotpasswordComponent,
    CleanComponent,
    GardenerComponent,
    HandymanComponent,
    PlumberComponent,
    SecurityComponent,
    ElectricianComponent,
    RepairComponent,
    PaintingComponent,
    WelderComponent,
    DashboardComponent,
    OrderComponent,
    OrderDialog,
    ComplaintComponentForm,
    ComplaintComponent,
    ComplaintDialog,
    ProfessinalsComponent,
    ProfessionalDialog
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,

    ImageUploadModule.forRoot(),
  ],
  providers: [
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
