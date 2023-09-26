import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { ProductResolveService } from './_service/product-resolve.service';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { BuyProductResolverService } from './_service/buy-product-resolver.service';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'register', component: RegisterComponent},
  {path: 'addNewProduct', component: AddNewProductComponent, canActivate:[AuthGuard], data:{roles:['Admin']},
    resolve:{
     product: ProductResolveService
    } 
  },
  {path: 'showProductDetails', component: ShowProductDetailsComponent, canActivate:[AuthGuard], data: {roles:['Admin']}},
  { path: 'productViewDetails', component: ProductViewDetailsComponent,resolve: {
      product: ProductResolveService
    } 
   },
   { path: 'orderConfirm', component: OrderConfirmationComponent, canActivate:[AuthGuard], data:{roles:['User']} },
   {path: 'buyProduct', component: BuyProductComponent, canActivate:[AuthGuard], data: {roles:['User']},
   resolve: {
    productDetails: BuyProductResolverService
  } 
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
