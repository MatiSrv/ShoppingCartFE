import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { DetailComponent } from './components/detail/detail.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/products', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'products/detail/:id', component: DetailComponent },
      { path: 'cart', component: CartComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home/products' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
