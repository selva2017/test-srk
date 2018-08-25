import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ServerService } from './../../shared/server.service';
import { UIService } from '../../shared/ui.service';
import { CommonServicesService } from '../../shared/common-services.service';
import { Employees } from './../../shared/employees';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  // @ViewChild('table1') table1: MatSort;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Employees>();
  subscription: Subscription;
  // displayedColumns = ['index', 'order_DT', 'order_GROUP_NO', 'customer_NAME', 'product_NAME', 'product_UNIT_COST', 'total_ORDER_UNIT', 'total_COST', 'sales_REP_NAME', 'order_STATUS'];
  displayedColumns = ['index','empCode', 'firstName', 'lastName', 'empDesignationName', 'contactNumber1', 'gender', 'bloodGroup'];

  showLoader: boolean;
  isLoading = false;
  employees: Employees[];
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

    this.refreshActiveList();
  }
  refreshActiveList() {
    this.employees = [];
    // this.subscription = this.serverService.getMessages().
    this.subscription = this.serverService.fetchEmployees().
      subscribe(list => {
        // console.log(list);
        this.employees = list;
        setTimeout(() => {
          this.dataSource.data = this.employees;
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
