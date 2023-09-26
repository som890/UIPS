import { FileHandle } from "./file-handle.model";

export interface Product {
    productId?:number,
    productName?: string,
    productDescription?: string,
    productActualPrice?: number,
    productDiscountedPrice?: number,
    productImages: FileHandle[]
    
}