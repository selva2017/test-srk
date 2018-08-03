import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ServerService } from './../../shared/server.service';
import { Orders } from '../../shared/orders';
import { DialogComponent } from '../dialog.component';
import { SubOrders } from '../../shared/sub-orders';
import { UIService } from '../../shared/ui.service';
import { CommonServicesService } from '../../shared/common-services.service';
@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {
  // @ViewChild('table1') table1: MatSort;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Orders>();
  orders: Orders[];
  subOrders: SubOrders[];
  order_row: Orders[];
  subscription: Subscription;
  // displayedColumns = ['index', 'order_DT', 'order_GROUP_NO', 'customer_NAME', 'product_NAME', 'product_UNIT_COST', 'total_ORDER_UNIT', 'total_COST', 'sales_REP_NAME', 'order_STATUS'];
  displayedColumns = ['index', 'order_DT', 'order_GROUP_NO', 'customer_NAME', 'product_NAME', 'product_UNIT_COST', 'total_ORDER_UNIT', 'total_COST', 'sales_REP_NAME', 'order_STATUS', 'action'];

  showLoader: boolean;
  isLoading = false;

  private loadingSubs: Subscription;
  // displayedColumns = ['index','order_DT', 'order_GROUP_NO', 'company', 'bf', 'size', 'voucherKey', 'weight', 'newWeight', 'reel', 'reelInStock', 'select'];
  // columns: any[];
  constructor(private serverService: ServerService, private dialog: MatDialog,
    private uiService: UIService, private commonServices: CommonServicesService) {

  }

  convertIndianRupee(amount) {
    return this.commonServices.displayINR(amount);
  }
  convertIndianFormat(amount) {
    return this.commonServices.displayIndianFormat(amount);
  }
  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // var num: any = 100;
    // return this.commonServices.displayIndianFormat('num').subscribe((res:any)=>{
    //     console.log(res);
    //   })
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.showLoader = true;
    this.uiService.loadingStateChanged.next(true);

    this.refreshActiveList();
  }
  refreshActiveList() {
    this.orders = [];
    // this.subscription = this.serverService.getMessages().
    this.subscription = this.serverService.fetchAllOrderByStatus("APPROVED").
      subscribe(list => {
        // console.log(list);
        this.orders = list;
        setTimeout(() => {
          this.dataSource.data = this.orders;
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
  // onClickView(order_row) {
  //   this.order_row = order_row;
  //   console.log(order_row);
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     // height: '90%',
  //     // width: '60%',
  //     height: "640px",
  //     width: '"640px"',
  //     data: {
  //       progress: this.order_row
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       // console.log("true");
  //       // this.onClickReviewed(key);
  //     } else {
  //       // console.log("false");
  //     }
  //   });
  // }
  onClickView(order_group_number) {
    // this.subscription = this.serverService.fetchSubOrder(order_group_number).
    //   subscribe(list => {
    //     console.log(list);
    //     this.subOrders = list;
    this.openDialog(order_group_number);
    // this.dataSource.data = this.orders;
    // !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
    // }
    // )
  }
  openDialog(order_group_number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '90%',
      width: '60%',
      // height: "640px",
      // width: '"640px"',
      data: {
        // progress: this.subOrders
        progress: order_group_number
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log("true");
        // this.onClickReviewed(key);
      } else {
        // console.log("false");
      }
    });
  }
}
