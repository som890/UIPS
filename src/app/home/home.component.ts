import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_service/product.service';
import { map } from 'rxjs/operators';
import { Product } from '../_model/product.model';
import { ImageProccesingService } from '../_service/image-proccesing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productDetails: Product[] = [];
  pageNumber: number = 0;
  showLoadButton = false;
  showTable = false;

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProccesingService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(searchKey: string = "") {
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber, searchKey)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (resp: Product[]) => {
           console.log(resp);
           resp.forEach(p => this.productDetails.push(p));
           console.log(("msg" + this.productDetails));
           this.showTable = true;
           if (resp.length == 12) {
            this.showLoadButton = true;
          } else {
            this.showLoadButton = false;
          }
          //this.productDetails = resp;
        }, (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
  showProductDetails(productId: any) {
    this.router.navigate(['/productViewDetails', { productId: productId }]);
  }
  loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }
  searchByKeyWord(searchkeyword: any){
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }

}
