import { ServerService } from './../../shared/server.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private serverService: ServerService) { }
products: Product[];
  ngOnInit() {
    this.products = [];
    this.serverService.fetchProductDetailForGroup('all')
      .subscribe(
        (list: Product[]) => {
          console.log(list);
          this.products = list;
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
