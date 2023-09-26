import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from '../_model/product.model';
import { Observable, map } from 'rxjs';
import { ProductService } from './product.service';
import { ImageProccesingService } from './image-proccesing.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]> {

  constructor(private productService: ProductService, private imageProccessingService: ImageProccesingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    const id = route.paramMap.get("id");
    const isSingleProductCheckOut  = route.paramMap.get("isSingleProductCheckOut");
    return this.productService.getProductDetails(isSingleProductCheckOut, id)
    .pipe(
      map(
        (x: Product[], i) => x.map((product: Product) => this.imageProccessingService.createImages(product))
      )
    );
  }
}
