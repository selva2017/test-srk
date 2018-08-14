import { Products } from './../../shared/products';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ServerService } from './../../shared/server.service';
import { UIService } from '../../shared/ui.service';
import { CommonServicesService } from '../../shared/common-services.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    // @ViewChild('table1') table1: MatSort;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    dataSource = new MatTableDataSource<Products>();
    subscription: Subscription;
    // displayedColumns = ['index', 'order_DT', 'order_GROUP_NO', 'customer_NAME', 'product_NAME', 'product_UNIT_COST', 'total_ORDER_UNIT', 'total_COST', 'sales_REP_NAME', 'order_STATUS'];
    displayedColumns = ['index', 'product_ID','hsn', 'product_NAME', 'product_GROUP_NAME', 'division_NAME', 'product_COST', 'product_TAX1', 'product_TAX2', 'loading_COST','laying_COST','uom'];
  
    showLoader: boolean;
    isLoading = false;
    products: Products[];
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
      this.products = [];
      // this.subscription = this.serverService.getMessages().
      this.subscription = this.serverService.fetchProducts().
        subscribe(list => {
          // console.log(list);
          this.products = list;
          setTimeout(() => {
            this.dataSource.data = this.products;
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
  
//   dataSource = new MatTableDataSource<Product>();
//   displayedColumns = ['division_NAME'];
//   product_detail: Product[]=[];
//   constructor(private serverService: ServerService) { }
//   ngOnInit() {
//     this.serverService.fetchAllProducts()
//       .subscribe(
//         (list: Product[]) => {
//           console.log(list);
//           this.product_detail = list;
//           this.dataSource.data = this.product_detail;
//         },
//         error => {
//         }
//       );
//   }
// }
