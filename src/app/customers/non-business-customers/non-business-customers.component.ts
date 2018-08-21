import { CustomerMaster } from './../../shared/customer-data';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ServerService } from './../../shared/server.service';
import { UIService } from '../../shared/ui.service';
import { CommonServicesService } from '../../shared/common-services.service';

@Component({
  selector: 'app-non-business-customers',
  templateUrl: './non-business-customers.component.html',
  styleUrls: ['./non-business-customers.component.css']
})
export class NonBusinessCustomersComponent implements OnInit {

// @ViewChild('table1') table1: MatSort;
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;

dataSource = new MatTableDataSource<CustomerMaster>();
subscription: Subscription;
// displayedColumns = ['index', 'order_DT', 'order_GROUP_NO', 'customer_NAME', 'product_NAME', 'product_UNIT_COST', 'total_ORDER_UNIT', 'total_COST', 'sales_REP_NAME', 'order_STATUS'];
displayedColumns = ['index', 'cust_ID', 'cust_NAME', 'cust_PHONE1', 'cust_PHONE2', 'alias','sales_REP_NAME', 'address', 'city', 'district','pinCode'];

showLoader: boolean;
isLoading = false;
private loadingSubs: Subscription;
// displayedColumns = ['index','order_DT', 'order_GROUP_NO', 'company', 'bf', 'size', 'voucherKey', 'weight', 'newWeight', 'reel', 'reelInStock', 'select'];
// columns: any[];
constructor(private serverService: ServerService, private dialog: MatDialog,
  private uiService: UIService, private commonServices: CommonServicesService) {

}

ngOnInit() {
  this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
    this.isLoading = isLoading;
  });
  this.showLoader = true;
  this.uiService.loadingStateChanged.next(true);

  this.refreshActiveList("sales_mgr");
}
// getBusinessCustomers(role) {
//   var id = '';
//   role == "sales_mgr" ? id = 'all' : id = localStorage.getItem('employeeId');
//   // console.log(id);
//   this.showLoader("Collecting the Customers....");
//   this.authService.fetchCustomerMaster("BUSINESS", id)
//     .subscribe(
//       (list) => {
//         // console.log(list);
//         this.future_customers = list;
//         this.loading.dismiss();
//       },
//       error => {
//         this.loading.dismiss();
//         // this.handleError(error.json().error);
//       }
//     );
// }
future_customers: CustomerMaster[] = [];
refreshActiveList(role) {
  var id = '';
  role == "sales_mgr" ? id = 'all' : id = localStorage.getItem('employeeId');
  // this.subscription = this.serverService.getMessages().
  this.subscription = this.serverService.fetchCustomerMaster("NON_BUSINESS", id).
  subscribe(list => {
    // console.log(list);
    this.future_customers = list;
    // this.employees = list;
    setTimeout(() => {
      this.dataSource.data = this.future_customers;
      !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
      this.dataSource.sort = this.sort;
    });
    this.showLoader = false;
    this.uiService.loadingStateChanged.next(false);
  },
    error => {
    }
  );

  this.showLoader = false;
}
ngAfterViewInit() {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;

}
doFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
  // this.dataSource_restore.filter = filterValue.trim().toLowerCase();
  // this.dataSource_prodplans.filter = filterValue.trim().toLowerCase();
}
onClickView(order_group_number) {
  // this.openDialog(order_group_number);
}
}
