import { Injectable, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { ImageProccesingService } from './image-proccesing.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators'
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements OnInit {

  constructor(private productService: ProductService,
              private imageProcessingService: ImageProccesingService) { }

  ngOnInit(): void {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable <Product>  {
    const id = route.paramMap.get("productId");

    if (id) {
      // Convert id to a number before calling the service
      const productId = Number(id);
  
      // Check if the conversion was successful
      if (!isNaN(productId)) {
        // We have to fetch details from the backend
        return this.productService.getProductDetailsById(productId).pipe(
          map(p => this.imageProcessingService.createImages(p))
        );
      }
    }
  
    // Return an empty product observable if there's no valid id
    return of(this.getProductDetails());
  }

  getProductDetails() {
    return {
      productId: 0,
      productName: "",
      productDescription: "",
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: []
    }
  }
}