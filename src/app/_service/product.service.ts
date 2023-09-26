import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public addProduct(product: FormData) {
    return this.http.post<Product>('http://localhost:9090/addNewProduct', product)
  }

  public getAllProducts(pageNumber: number, searchKey: string = ""){
    return this.http.get<Product[]>("http://localhost:9090/getAllProducts?pageNumber="+ pageNumber+"&searchKey="+ searchKey);
    
    }
  public deleteProduct(productId: number) {
    return this.http.delete("http://localhost:9090/deleteProductsDetails/" + productId)
  }
  public getProductDetailsById(productId: number) {
    return this.http.get<Product>("http://localhost:9090/getProductDetailsById/"+ productId)
    }
    public getProductDetails(isSingleProductCheckOut: any, productId: any) {
      return this.http.get<Product[]>("http://localhost:9090/getProductDetails/"+ isSingleProductCheckOut + "/" + productId);
    }
    public placeOrder(orderDetails: OrderDetails) {
     return this.http.post("http://localhost:9090/placeOrder", orderDetails);
    }
}
