import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { ServerService } from './../shared/server.service';
import { SubOrders } from '../shared/sub-orders';
import { CommonServicesService } from '../shared/common-services.service';
import { UIService } from '../shared/ui.service';

@Component({
  selector: 'daybook-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  dataSource = new MatTableDataSource<SubOrders>();

  subscription: Subscription;
  subOrders: SubOrders[];
  // displayedColumns = ['index', 'order_GROUP_NO', 'order_NO', 'customer_NAME', 'product_NAME', 'unit_TYPE', 'unit', 'order_PRODUCT_COST', 'order_TOTAL_COST', 'sub_ORDER_STATUS'];
  // displayedColumns = ['index',  'order_NO', 'product_NAME', 'unit_TYPE', 'unit', 'order_PRODUCT_COST', 'order_TOTAL_COST', 'sub_ORDER_STATUS'];
  displayedColumns = ['index', 'order_NO', 'product_NAME', 'unit_TYPE', 'order_PRODUCT_COST', 'order_TOTAL_COST', 'sub_ORDER_STATUS'];
  order_number: string;
  customer_name: string;
  showLoader: boolean;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private serverService: ServerService, private commonServices: CommonServicesService, private uiService: UIService,
    @Inject(MAT_DIALOG_DATA) public passedData: any) {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    // This is causing reset of the main window
    // this.showLoader = true;
    // this.uiService.loadingStateChanged.next(true);

    // console.log("passedData");
    this.order_number = passedData.progress;
    this.subscription = this.serverService.fetchSubOrder(passedData.progress).
      subscribe(list => {
        // console.log(list);
        this.subOrders = list;
        this.dataSource.data = this.subOrders;
        this.customer_name = this.subOrders[0]['customer_NAME'];
        // console.log(this.subOrders[0]);
        // console.log(this.subOrders);
        // console.table(this.subOrders);
        // console.dir(this.subOrders);
        // This is causing reset of the main window
        // this.showLoader = false;
        // this.uiService.loadingStateChanged.next(false);
        // !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
      }
      )
  }
  onClickPrint() {
    window.print();
  }
  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  }
  convertIndianRupee(amount) {
    return this.commonServices.displayINR(amount);
  }
  convertIndianFormat(amount) {
    return this.commonServices.displayIndianFormat(amount);
  }
}
