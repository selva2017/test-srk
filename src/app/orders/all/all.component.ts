import { ServerService } from './../../shared/server.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Orders } from '../../shared/orders';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  @ViewChild('table1') table1: MatSort;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Orders>();
  orders: Orders[];
  subscription: Subscription;
  displayedColumns = ['index', 'order_DT', 'order_GROUP_NO', 'customer_NAME', 'product_NAME', 'product_UNIT_COST', 'total_ORDER_UNIT', 'total_COST','sales_REP_ID','order_STATUS'];
  // displayedColumns = ['index','order_DT', 'order_GROUP_NO', 'company', 'bf', 'size', 'voucherKey', 'weight', 'newWeight', 'reel', 'reelInStock', 'select'];

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.refreshActiveList();
  }
  refreshActiveList() {
    this.orders = [];
    // this.subscription = this.serverService.getMessages().
    this.subscription = this.serverService.fetchAllOrderByStatus("ESTIMATED").
      subscribe(list => {
        console.log(list);
        this.orders = list;
        this.dataSource.data = this.orders;
        !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
      }
      )
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.table1;
    this.dataSource.paginator = this.paginator;

  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // this.dataSource_restore.filter = filterValue.trim().toLowerCase();
    // this.dataSource_prodplans.filter = filterValue.trim().toLowerCase();
  }

}
