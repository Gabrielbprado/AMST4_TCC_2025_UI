import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductComponent } from './product/product.component';
import { SigninSignupComponent } from './customer/signin-signup/signin-signup.component';
import { PageNotFoundComponent } from './shared/Components/page-not-found/page-not-found.component';
import { ProfileComponent } from './customer/profile/profile.component';
import { RegistrationComponent } from './customer/registration/registration.component';
import { LoginComponent } from './customer/login/login.component';
import { FinalizeorderComponent } from './product/finalizeorder/finalizeorder.component';
import { OrderCompletedComponent } from './product/order-completed/order-completed.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'user-profile', component: ProfileComponent },
  { path: 'user-register', component: RegistrationComponent },
  { path: 'user-login', component: LoginComponent },
  { path: 'finalize-order', component: FinalizeorderComponent },
  { path: 'order-completed', component: OrderCompletedComponent },
  {
    path: '',
    children: [{ path: 'user-login', component: LoginComponent }],
  },
  {
    path: '',
    children: [
      { path: 'admin//product', component: ProductComponent },
    ],
  },
  {
    path: '',
    children: [
      { path: 'sign-in', component: SigninSignupComponent },
      { path: 'sign-up', component: SigninSignupComponent },
    ],
  },
  {
    path: '',
    children: [
      { path: 'seller/product', component: ProductComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
