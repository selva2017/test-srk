import { CommonServicesService } from './../../shared/common-services.service';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ServerService } from './../../shared/server.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SubOrders } from '../../shared/sub-orders';
import { UIService } from '../../shared/ui.service';
import { DataGridUtil } from './../../shared/datagrid.util';
import { Format } from './../../shared/format';

@Component({
  selector: 'app-delivered',
  templateUrl: './delivered.component.html',
  styleUrls: ['./delivered.component.css']
})
export class DeliveredComponent implements OnInit {
  // @ViewChild('table1') table1: MatSort;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<SubOrders>();
  subOrders: SubOrders[];
  subscription: Subscription;
  displayedColumns = ['index', 'order_GROUP_NO', 'order_NO', 'customer_NAME', 'product_NAME', 'unit_TYPE', 'unit', 'order_PRODUCT_COST','order_TAX1','order_TAX2', 'order_TOTAL_COST', 'sub_ORDER_STATUS'];
  showLoader: boolean;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private serverService: ServerService, private uiService: UIService,
    private commonServices: CommonServicesService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.showLoader = true;
    this.uiService.loadingStateChanged.next(true);
    this.refreshActiveList();
  }
  refreshActiveList() {
    this.subOrders = [];
    // this.subscription = this.serverService.getMessages().
    this.subscription = this.serverService.fetchAllSubOrders("DELIVERED").
      subscribe(list => {
        console.log(list);
        this.subOrders = list;
        setTimeout(() => {
          this.dataSource.data = this.subOrders;
          !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
          this.dataSource.sort = this.sort;
        }); this.showLoader = false;

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
  convertIndianRupee(amount) {
    return this.commonServices.displayINR(amount);
  }
  convertIndianFormat(amount) {
    return this.commonServices.displayIndianFormat(amount);
  }
  exportFileName: string = 'delivered_suborders';
  columns: any[] = [
    {
      display: 'No',
      variable: 'index',
      filter: 'text'
    },
    {
      display: 'Order Group No',
      variable: 'order_GROUP_NO',
      filter: 'text'
    },
    {
      display: 'Order No',
      variable: 'order_NO',
      filter: 'text'
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
      display: 'Unit Type',
      variable: 'unit_TYPE',
      filter: 'text'
    },
    {
      display: 'Unit',
      variable: 'unit',
      filter: 'text'
    },
    {
      display: 'Product Cost',
      variable: 'order_PRODUCT_COST',
      filter: 'text'
    },
    {
      display: 'CGST',
      variable: 'order_TAX1',
      filter: 'text'
    },
    {
      display: 'SGST',
      variable: 'order_TAX2',
      filter: 'text'
    },
    {
      display: 'Total Cost',
      variable: 'order_TOTAL_COST',
      filter: 'text'
    },
    {
      display: 'SubOrder Status',
      variable: 'sub_ORDER_STATUS',
      filter: 'text'
    },
  ];
  exporttoCSV() {
    // console.log(this.orders);
    let exprtcsv: any[] = [];
    (<any[]>JSON.parse(JSON.stringify(this.subOrders))).forEach(x => {
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