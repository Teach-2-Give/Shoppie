import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { RequestResetComponent } from './components/request-reset/request-reset.component';
import { ResetPasswordComponent } from './components/reset-pass/reset-pass.component';
// import { ResetComponent } from './components/reset-request/reset.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'admin',component:AdminDashboardComponent},
    { path: 'request-reset', component: RequestResetComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
    // {path:'reset',component:ResetComponent}
];
