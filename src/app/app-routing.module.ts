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

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'plan', component: SalesOrdersComponent },
  { path: 'manage', component: ManageComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard', component: DashboardComponent}
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  { path: 'sub-orders', component: SubOrdersComponent, canActivate: [AuthGuard]},
  { path: 'all', component: AllComponent},
  { path: 'estimated', component: EstimatedComponent},
  { path: 'reestimated', component: ReEstimatedComponent},
  { path: 'approved', component: ApprovedComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
