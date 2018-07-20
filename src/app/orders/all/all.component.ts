import { ServerService } from './../../shared/server.service';
import { DataGridUtil } from './../../shared/datagrid.util';
import { Format } from './../../shared/format';
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
  displayedColumns = ['index', 'order_DT', 'order_GROUP_NO', 'customer_NAME', 'product_NAME', 'product_UNIT_COST', 'total_ORDER_UNIT', 'total_COST', 'sales_REP_NAME', 'order_STATUS'];
  // displayedColumns = ['index','order_DT', 'order_GROUP_NO', 'company', 'bf', 'size', 'voucherKey', 'weight', 'newWeight', 'reel', 'reelInStock', 'select'];
  // columns: any[];
  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.refreshActiveList();
  }
  refreshActiveList() {
    this.orders = [];
    // this.subscription = this.serverService.getMessages().
    this.subscription = this.serverService.fetchAllOrderByStatus("APPROVED").
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
  exportFileName: string = 'All_Orders';
  columns: any[] = [
    {
      display: 'No',
      variable: 'index',
      filter: 'text'
    },
    {
      display: 'Order Date',
      variable: 'order_DT',
      filter: 'date'
    },
    {
      display: 'Order No',
      variable: 'order_GROUP_NO',
      filter: 'number'
    },
    {
      display: 'Customer Name',
      variable: 'customer_NAME',
      filter: 'text',
    },
    {
      display: 'Product Name',
      variable: 'product_NAME',
      filter: 'text',
    },
    {
      display: 'Cost',
      variable: 'product_UNIT_COST',
      filter: 'text',
    },
    {
      display: 'Order Units',
      variable: 'total_ORDER_UNIT',
      filter: 'text',
    },
    {
      display: 'Total Cost',
      variable: 'total_COST',
      filter: 'text',
    },
    {
      display: 'Sales Rep',
      variable: 'sales_REP_ID',
      filter: 'text',
    },
    {
      display: 'Status',
      variable: 'order_STATUS',
      filter: 'text',
    },
  ];
  exporttoCSV() {
    console.log(this.orders);
    let exprtcsv: any[] = [];
    (<any[]>JSON.parse(JSON.stringify(this.orders))).forEach(x => {
      var obj = new Object();
      var frmt = new Format();
      for (var i = 0; i < this.columns.length; i++) {
        let transfrmVal = frmt.transform(x[this.columns[i].variable],
          this.columns[i].filter);
        obj[this.columns[i].display] = transfrmVal;
      }
      exprtcsv.push(obj);
    }
    );
    DataGridUtil.downloadcsv(exprtcsv, this.exportFileName);
  }
}
