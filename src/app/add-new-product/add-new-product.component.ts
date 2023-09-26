import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_service/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
  isNewProduct = true;

  product: Product = {
    productId:0,
    productName:"",
    productDescription:"",
    productDiscountedPrice:0,
    productActualPrice:0,
    productImages:[]
  }

  constructor(private productService: ProductService, private sanitizer: DomSanitizer,
            private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    if(this.product&& this.product.productId) {
      this.isNewProduct=false;
  }
}

  
  addProduct(productForm: NgForm) {
    const productFormData = this.prepareFormData(this.product)

    this.productService.addProduct(productFormData).subscribe(
      (respone: Product) => {
       productForm.reset();
       this.product.productImages = [];
      },
      (error : HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

    prepareFormData(product: Product): FormData {
      const formData = new FormData();
      formData.append(
        'product', 
        new Blob([JSON.stringify(product)], {type: 'application/json'})
      );

      for(var i = 0; i < product.productImages.length;i++) {
        formData.append(
          'imageFile', 
          product.productImages[i].file,
          product.productImages[i].file.name
        );

      }
      return formData;
    }

  onFileSelected(event:any) {
    if(event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle ={
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.product.productImages.push(fileHandle);
    }
  }
  removeImage(i: number) {
    this.product.productImages.splice(i, 1);
  }
  fileDroped(fileHandle: FileHandle) {
    this.product.productImages.push(fileHandle);
  }
}
