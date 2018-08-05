import { VehicleListComponent } from './vehicles/vehicle-list/vehicle-list.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { PriceCheckComponent } from './price-check/price-check.component';
import { PcRequestsComponent } from './price-check/pc-requests/pc-requests.component';
import { PcResponsesComponent } from './price-check/pc-responses/pc-responses.component';
import { CommonServicesService } from './shared/common-services.service';
import { InventoryService } from './shared/inventory.service';
import { ServerService } from './shared/server.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './auth/auth.service';
import { HttpModule } from '@angular/http';
import { AdminComponent } from './manage/admin/admin.component';
import { PublishComponent } from './manage/publish/publish.component';
import { ManageComponent } from './manage/manage.component';
import { UIService } from './shared/ui.service';
import { AdminExtComponent } from './manage/admin-ext/admin-ext.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartModule } from 'angular2-chartjs';
import { OrdersComponent } from './orders/orders.component';
import { SubOrdersComponent } from './sub-orders/sub-orders.component';
import { ApprovedsoComponent } from './sub-orders/approvedso/approvedso.component';
import { EstimatedComponent } from './orders/estimated/estimated.component';
import { AllComponent } from './orders/all/all.component';
import { ReEstimatedComponent } from './orders/re-estimated/re-estimated.component';
import { ApprovedComponent } from './orders/approved/approved.component';
import { DialogComponent } from './orders/dialog.component';
import { MatButtonModule } from '../../node_modules/@angular/material';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    AdminComponent,
    AdminExtComponent,
    PublishComponent,
    ManageComponent,
    AdminExtComponent,
    DashboardComponent,
    OrdersComponent,
    EstimatedComponent,
    AllComponent,
    ReEstimatedComponent,
    ApprovedComponent,
    SubOrdersComponent,
    ApprovedsoComponent,
    DialogComponent,
    PriceCheckComponent,
    PcRequestsComponent,
    PcResponsesComponent,
    ProductsComponent,
    ProductListComponent,
    EmployeesComponent,
    EmployeeListComponent,
    VehiclesComponent,
    VehicleListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ChartModule,
   
  ],
  providers: [InventoryService,AuthService, ServerService,UIService,CommonServicesService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
