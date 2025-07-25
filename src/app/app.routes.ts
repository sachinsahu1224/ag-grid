import { Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { ProductComponent } from './product/product.component';
import { SubscribeComponent } from './subscribe/subscribe.component';

export const routes: Routes = [
  { path: 'customers', component: CustomerComponent },
  { path: 'products', component: ProductComponent },
  { path: 'subscribes', component: SubscribeComponent },
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
];
