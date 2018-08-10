import { MatTableDataSource } from '@angular/material';
import { ServerService } from './../../shared/server.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  dataSource = new MatTableDataSource<Product>();
  displayedColumns = ['division_NAME'];
  product_detail: Product[]=[];

  constructor(private serverService: ServerService) { }
  
  ngOnInit() {
    // this.product_detail = [];
    this.serverService.fetchAllProducts()
    // this.serverService.fetchProductDetailForGroup('all')
      .subscribe(
        (list: Product[]) => {
          console.log(list);
          this.product_detail = list;
          this.dataSource.data = this.product_detail;
            // this.loading.dismiss();
          // this.disableItemName = false;
        },
        error => {
          // this.loading.dismiss();
          // this.handleError(error.json().error);
        }
      );

    
  }

  
}
