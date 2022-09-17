import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './MyComponents/index/index.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { CardComponent } from './MyComponents/card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FooterComponent } from './MyComponents/footer/footer.component';
import { RegisterComponent } from './MyComponents/register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './MyComponents/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicServicesService } from './Services/basic-services.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { AdminHomeComponent } from './MyComponents/Admin/admin-home/admin-home.component';
import { UserHomeComponent } from './MyComponents/User/user-home/user-home.component';
import { AdminDashboardComponent } from './MyComponents/Admin/admin-dashboard/admin-dashboard.component';
import { GlobalInterceptorInterceptor } from './Interceptors/global-interceptor.interceptor';
import { UserDashboardComponent } from './MyComponents/User/user-dashboard/user-dashboard.component';
import { ManageProductsComponent } from './MyComponents/Admin/manage-products/manage-products.component';
import { AdminServiceService } from './Services/AdminService/admin-service.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import { ItemCardComponent } from './MyComponents/item-card/item-card.component';
import { UserProfileComponent } from './MyComponents/User/user-profile/user-profile.component';
import { UserPurchaseHistoryComponent } from './MyComponents/User/user-purchase-history/user-purchase-history.component';
import { UserCheckoutComponent } from './MyComponents/User/user-checkout/user-checkout.component';
import { SortPipe } from './Pipes/sort.pipe';
import { FilterPipe } from './Pipes/filter.pipe';
import { DistinctFilterPipe } from './Pipes/distinct-filter.pipe';
import { DistnctParaFilterPipe } from './Pipes/distnct-para-filter.pipe';
import { UserPaymentComponent } from './MyComponents/User/user-payment/user-payment.component';
import { FilterByCompanyPipe } from './Pipes/filter-by-company.pipe';
import { OrderDetailsComponent } from './MyComponents/User/order-details/order-details.component';
import { EditItemComponent } from './MyComponents/Admin/edit-item/edit-item.component';
import { AboutComponent } from './MyComponents/about/about.component';
import { ProductDescriptionComponent } from './MyComponents/User/product-description/product-description.component';
import { ManageUsersComponent } from './MyComponents/Admin/manage-users/manage-users.component';
import { LoaderComponent } from './MyComponents/User/loader/loader.component';
import { SafeHtmlPipePipe } from './Pipes/safe-html-pipe.pipe';
import { PopUpDialogComponent } from './MyComponents/pop-up-dialog/pop-up-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    CardComponent,
    FooterComponent,
    RegisterComponent,
    HeaderComponent,
    AdminHomeComponent,
    UserHomeComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ManageProductsComponent,
    ItemCardComponent,
    UserProfileComponent,
    UserPurchaseHistoryComponent,
    UserCheckoutComponent,
    SortPipe,
    FilterPipe,
    DistinctFilterPipe,
    DistnctParaFilterPipe,
    UserPaymentComponent,
    FilterByCompanyPipe,
    OrderDetailsComponent,
    EditItemComponent,
    AboutComponent,
    ProductDescriptionComponent,
    ManageUsersComponent,
    LoaderComponent,
    SafeHtmlPipePipe,
    PopUpDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatBadgeModule
  ],
  providers: [BasicServicesService,MatSnackBar,
  {provide:HTTP_INTERCEPTORS, useClass: GlobalInterceptorInterceptor,multi:true},
  AdminServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
