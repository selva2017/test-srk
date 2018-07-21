import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { ServerService } from './../shared/server.service';
import { SubOrders } from '../shared/sub-orders';

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
  displayedColumns = ['index',  'order_NO', 'product_NAME', 'unit_TYPE', 'unit', 'order_PRODUCT_COST', 'order_TOTAL_COST', 'sub_ORDER_STATUS'];
  order_number: string;
  customer_name: string;

  constructor(private serverService: ServerService, @Inject(MAT_DIALOG_DATA) public passedData: any) {
    console.log("passedData");
    this.order_number = passedData.progress;
    this.subscription = this.serverService.fetchSubOrder(passedData.progress).
      subscribe(list => {
        console.log(list);
        this.subOrders = list;
        this.dataSource.data = this.subOrders;
        this.customer_name =  this.subOrders[0]['customer_NAME'];
        console.log(this.subOrders[0]);
        console.log(this.subOrders);
        console.table(this.subOrders);
        console.dir(this.subOrders);
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

}
