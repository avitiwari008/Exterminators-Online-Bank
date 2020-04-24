import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeneficiaryComponent } from './beneficiary/beneficiary.component';
import { AddbeneficiaryComponent } from './addbeneficiary/addbeneficiary.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { RegisterComponent } from './signup/register/register.component';
import { LoginComponent } from './login/login-component/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DonateCovidComponent } from './donate-covid/donate-covid.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CcDashComponent } from './cc-dash/cc-dash.component';
import { CustomercareComponent } from './customercare/customercare.component';
import {FundstransferComponent} from './fundstransfer/fundstransfer.component'
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LogoutConfirmationDialogComponent } from './login/logout-confirmation-dialog/logout-confirmation-dialog.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'beneficiaries', component: BeneficiaryComponent },
  { path: 'register', component: RegisterComponent,},
  { path: 'beneficiaries/add', component: AddbeneficiaryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ccdashboard', component: CcDashComponent },
  { path: 'donatecovid', component: DonateCovidComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'complaints', component: CustomercareComponent },
  { path: 'fundstransfer', component: FundstransferComponent},
  { path: 'profile', component: UserProfileComponent},
  { path: 'logout', component: LogoutConfirmationDialogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
