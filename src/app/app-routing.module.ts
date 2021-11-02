import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
// import { ServicesComponent } from './pages/services/services.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { CleanComponent } from './pages/services/clean/clean.component';
import { GardenerComponent } from './pages/services/gardener/gardener.component';
import { HandymanComponent } from './pages/services/handyman/handyman.component';
import { PlumberComponent } from './pages/services/plumber/plumber.component';
import { SecurityComponent } from './pages/services/security/security.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrderDisplayComponent } from './pages/order/order.display.component';

import { ElectricianComponent } from './pages/services/electrician/electrician.component';
import { RepairComponent } from './pages/services/repair/repair.component';
import { PaintingComponent } from './pages/services/painting/painting.component';
import { WelderComponent } from './pages/services/welder/welder.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clean', component: CleanComponent },
  { path: 'gardener', component: GardenerComponent },
  { path: 'handyman', component: HandymanComponent },
  { path: 'plumber', component: PlumberComponent },
  { path: 'security', component: SecurityComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'electrician', component: ElectricianComponent },
  { path: 'repairandmaintenance', component: RepairComponent },
  { path: 'painter', component: PaintingComponent },
  { path: 'welder', component: WelderComponent },
  
  // { path: 'order/:path', component: OrderDisplayComponent },
  // { path: 'forgotpassword', component: ForgotpasswordComponent },
  // { path: '', redirectTo: '/first-component', pathMatch: 'full' }, // redirect to `first-component`
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
