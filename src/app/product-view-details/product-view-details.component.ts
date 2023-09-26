import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit{

  product!: Product;
  selectedProductIndex = 0;
  
  constructor(private activedRoute: ActivatedRoute, private router: Router){}
  
  ngOnInit(): void {
    this.product = this.activedRoute.snapshot.data['product'];
  }
  changeIndex(index: number) {
    this,this.selectedProductIndex = index;
  }
  buyProduct(productId: any) {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckOut: true, id: productId 
    }]);
  }

}
