import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuardGuard } from './Guards/admin-guard.guard';
import { BasicGuardGuard } from './Guards/basic-guard.guard';
import { UserGuardGuard } from './Guards/user-guard.guard';
import { AboutComponent } from './MyComponents/about/about.component';
import { AdminHomeComponent } from './MyComponents/Admin/admin-home/admin-home.component';
import { EditItemComponent } from './MyComponents/Admin/edit-item/edit-item.component';
import { ManageProductsComponent } from './MyComponents/Admin/manage-products/manage-products.component';
import { ManageUsersComponent } from './MyComponents/Admin/manage-users/manage-users.component';
import { IndexComponent } from './MyComponents/index/index.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { RegisterComponent } from './MyComponents/register/register.component';
import { OrderDetailsComponent } from './MyComponents/User/order-details/order-details.component';
import { ProductDescriptionComponent } from './MyComponents/User/product-description/product-description.component';
import { UserCheckoutComponent } from './MyComponents/User/user-checkout/user-checkout.component';
import { UserHomeComponent } from './MyComponents/User/user-home/user-home.component';
import { UserPaymentComponent } from './MyComponents/User/user-payment/user-payment.component';
import { UserProfileComponent } from './MyComponents/User/user-profile/user-profile.component';
import { UserPurchaseHistoryComponent } from './MyComponents/User/user-purchase-history/user-purchase-history.component';

const routes: Routes = [
{
  path:"",
  component:IndexComponent,
  pathMatch:"full",
  canActivate:[BasicGuardGuard]
},
{
  path:"login",
  component:LoginComponent,
        // children: [
        //   {path:"test",component: FooterComponent,pathMatch:"full"}
        // ]
  canActivate:[BasicGuardGuard]
},
{
  path:"register",
  component:RegisterComponent,
  pathMatch:"full",
  canActivate:[BasicGuardGuard]
},
{
  path:"about",
  component:AboutComponent,
  pathMatch:"full"
},
{
  path:"admin",
  canActivate:[AdminGuardGuard],
  children:[
    {path:"",redirectTo:"/admin/home",pathMatch:"full"},
    {path:"home",component:AdminHomeComponent,canActivate:[AdminGuardGuard]},
    {path:"manageProducts",component:ManageProductsComponent,canActivate:[AdminGuardGuard]},
    {path:"edit/:itemId",component:EditItemComponent,canActivate:[AdminGuardGuard]},
    {path:"manageUsers",component:ManageUsersComponent,canActivate:[AdminGuardGuard]}
  ]
},
{
  path:"user",
  canActivate:[UserGuardGuard],
  children:[
    {path:"",redirectTo:"/user/home",pathMatch:"full"},
    {path:"home",component:UserHomeComponent,canActivate:[UserGuardGuard]},
    {path:"profile",component:UserProfileComponent,canActivate:[UserGuardGuard]},
    {path:"purchaseHistory",component:UserPurchaseHistoryComponent,canActivate:[UserGuardGuard]},
    {path:"checkout",component:UserCheckoutComponent,canActivate:[UserGuardGuard]},
    {path:"payment",component:UserPaymentComponent,canActivate:[UserGuardGuard]},
    {path:"orderDetails",component:OrderDetailsComponent,canActivate:[UserGuardGuard]},
    {path:"product/:itemId",component:ProductDescriptionComponent,canActivate:[UserGuardGuard]}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
