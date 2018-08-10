import { CommonServicesService } from './../../shared/common-services.service';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ServerService } from './../../shared/server.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SubOrders } from '../../shared/sub-orders';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-weighing',
  templateUrl: './weighing.component.html',
  styleUrls: ['./weighing.component.css']
})
export class WeighingComponent implements OnInit {

// @ViewChild('table1') table1: MatSort;
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;

dataSource = new MatTableDataSource<SubOrders>();
subOrders: SubOrders[];
subscription: Subscription;
displayedColumns = ['index', 'order_GROUP_NO', 'order_NO', 'customer_NAME', 'product_NAME', 'unit_TYPE', 'unit', 'order_PRODUCT_COST', 'order_TOTAL_COST', 'sub_ORDER_STATUS'];
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
  this.subscription = this.serverService.fetchAllSubOrders("LOADED").
    subscribe(list => {
      // console.log(list);
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

}