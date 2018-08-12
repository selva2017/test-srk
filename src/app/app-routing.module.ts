import { VehicleListComponent } from './vehicles/vehicle-list/vehicle-list.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeesComponent } from './employees/employees.component';
import { PcResponsesComponent } from './price-check/pc-responses/pc-responses.component';
import { PcRequestsComponent } from './price-check/pc-requests/pc-requests.component';
import { PriceCheckComponent } from './price-check/price-check.component';
import { SubOrdersComponent } from './sub-orders/sub-orders.component';
import { ReEstimatedComponent } from './orders/re-estimated/re-estimated.component';
import { ApprovedComponent } from './orders/approved/approved.component';
import { EstimatedComponent } from './orders/estimated/estimated.component';
import { AllComponent } from './orders/all/all.component';
import { OrdersComponent } from './orders/orders.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageComponent } from './manage/manage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'plan', component: SalesOrdersComponent },
  { path: 'manage', component: ManageComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard', component: DashboardComponent}
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'sub-orders', component: SubOrdersComponent},
  // { path: 'sub-orders', component: SubOrdersComponent, canActivate: [AuthGuard] },
  { path: 'all', component: AllComponent },
  { path: 'estimated', component: EstimatedComponent },
  { path: 'reestimated', component: ReEstimatedComponent },
  { path: 'approved', component: ApprovedComponent, canActivate: [AuthGuard] },
  { path: 'price-check', component: PriceCheckComponent},
  // { path: 'price-check', component: PriceCheckComponent, canActivate: [AuthGuard] },
  { path: 'pcrequests', component: PcRequestsComponent, canActivate: [AuthGuard] },
  { path: 'pcresponses', component: PcResponsesComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent},
  // { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'vehicles', component: VehiclesComponent, canActivate: [AuthGuard] },
  { path: 'vehicle-list', component: VehicleListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
