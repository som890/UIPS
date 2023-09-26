import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_service/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProccesingService } from '../_service/image-proccesing.service';
import { map } from 'rxjs/operators';
import { Product } from '../_model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {
  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Name', 'description', 'Product Discounted Price', 'Product Acutal Price', 'Actions'];

  pageNumber: number = 0;
  showTable = false;
  showMoreProductButton = false;

  constructor(private productService:ProductService, public imagesDialog: MatDialog, 
              private imageProcessingService:ImageProccesingService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }
  searchByKeyWord(searchkeyword: any){
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }
  
  public getAllProducts(searchKeyWord: string = "") {
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber, searchKeyWord).pipe(
      map((x:Product[], i)=>x.map((product:Product)=>this.imageProcessingService.createImages(product)))
    )
    .subscribe(
    (resp: Product[]) => {
      console.log(resp);
       resp.forEach(product => this.productDetails.push(product));
      console.log(("msg" + this.productDetails));
      this.showTable = true;
      //this.productDetails = resp;
      if(resp.length == 12) {
        this.showMoreProductButton = true;
      }else {
        this.showMoreProductButton = false;
      }
    }, (error:HttpErrorResponse)=>{
      console.log(error);
    }
    );
  }


  deleteProduct(productId: number) {

    console.log(productId);
    this.productService.deleteProduct(productId).subscribe(
      (resp) => {
        this.getAllProducts();
      }, (error:HttpErrorResponse)=>{
        console.log(error);
      }
      );

  }

  showImages(product:Product){
    console.log(product);
    
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height:'500px',
      width:'800px'
    });

  }
  updateProductDetails(productId: number) {
    this.router.navigate(['/addNewProduct',{productId: productId}]); 
  }
  loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }
  
}