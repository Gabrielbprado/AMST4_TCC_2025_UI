import { Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { ProfileComponent } from './core/pages/customer/profile/profile.component';
import { RegistrationComponent } from './core/pages/customer/registration/registration.component';
import { LoginComponent } from './core/pages/customer/login/login.component';
import { FinalizeorderComponent } from './core/pages/product/finalizeorder/finalizeorder.component';
import { OrderCompletedComponent } from './core/pages/product/order-completed/order-completed.component';
import { ProductRegistrationComponent } from './core/pages/product/product-registration/product-registration.component';
import { ProductEditComponent } from './core/pages/product/product-edit/product-edit.component';
import { DeleteProductComponent } from './core/pages/product/delete-product/delete-product.component';
import { ProductComponent } from './core/pages/product/product.component';
import { PageNotFoundComponent } from './shared/Components/page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './core/pages/product/product-details/product-details.component';
import { PixPaymentComponent } from './shared/Components/pix-payment/pix-payment.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user-profile', component: ProfileComponent },
  { path: 'user-register', component: RegistrationComponent },
  { path: 'user-login', component: LoginComponent },
  { path: 'finalize-order', component: FinalizeorderComponent },
  { path: 'order-completed', component: OrderCompletedComponent },
  { path: 'product-registration', component: ProductRegistrationComponent },
  { path: 'product-edit', component: ProductEditComponent },
  { path: 'product-delete', component: DeleteProductComponent },
  { path: 'pix-payment/:id', component: PixPaymentComponent },
  { path: 'product-details', component: ProductDetailsComponent},
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
      { path: 'seller/product', component: ProductComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
