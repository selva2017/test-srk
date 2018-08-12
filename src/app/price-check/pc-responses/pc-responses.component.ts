import { UIService } from './../../shared/ui.service';
import { Subscription } from 'rxjs/Subscription';
import { CommonServicesService } from './../../shared/common-services.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ServerService } from './../../shared/server.service';
import { Pricing } from './../../shared/pricing';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pc-responses',
  templateUrl: './pc-responses.component.html',
  styleUrls: ['./pc-responses.component.css']
})
export class PcResponsesComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Pricing>();
  // displayedColumns = ['index', 'orderGroupNo',];
  displayedColumns = ['index', 'customerName', 'orderGroupNo', 'productGroupName', 'salesRepName', 'orderPriority', 'unitsTotal', 'totalCost', 'orderDate'];
  // displayedColumns = ['index', 'order_DT', 'order_GROUP_NO', 'customer_NAME', 'product_NAME', 'product_UNIT_COST', 'total_ORDER_UNIT', 'total_COST', 'sales_REP_NAME', 'order_STATUS', 'action'];
  pricing: Pricing[];
  pricing1: Pricing[];
  role: string;
  showLoader: boolean;
  isLoading = false;
  subscription: Subscription;
  private loadingSubs: Subscription;
  constructor(private serverService: ServerService, private uiService: UIService, private commonServices: CommonServicesService) {
    this.role = '1';
    this.retrievePriceResponses('ORDER_PRICE_CHECK_APPROVED');
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

  ngOnInit() {

    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.showLoader = true;
    this.uiService.loadingStateChanged.next(true);

  }
  retrievePriceResponses(status) {
    if (this.role == '1' || this.role == '2') {
      // this.retrieveAllEstimatedOrders();
      this.retrieveAllPriceCheckResponse(status);
    }
    else if (this.role == '3') {
      // this.retrieveEstimatedOrders();
      this.retrievePriceCheckResponse(status);
    }
  }
  retrieveAllPriceCheckResponse(status) {
    this.pricing1 = [];
    // console.log(status);
    // this.showLoader("Collecting all Price checks reponded....");
    this.serverService.fetchAllPriceCheckResponse(status)
      .subscribe(
        (list: Pricing[]) => {
          this.pricing1 = list;
          setTimeout(() => {
            this.dataSource.data = this.pricing1;
            !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
            this.dataSource.sort = this.sort;
          });// this.sites = list;
          // this.sites = list;
          // console.log(this.pricing1);
          // this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );
  }
  retrievePriceCheckResponse(status) {
    this.pricing1 = [];
    // console.log(status);
    // this.showLoader("Collecting my Price checks reponded....");
    this.serverService.fetchPriceCheckResponse(status)
      .subscribe(
        (list: Pricing[]) => {
          this.pricing1 = list;
          setTimeout(() => {
            this.dataSource.data = this.pricing1;
            !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
            this.dataSource.sort = this.sort;
          });// this.sites = list;
          // console.log(this.pricing1);
          // this.loading.dismiss();
        },
        error => {
          // this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
