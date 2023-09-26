import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProccesingService {

  constructor(private sanitizer: DomSanitizer) { }

  // This create images function will take one parameter (product type) and process all the images
  // which recives from product
  public createImages(product: Product) {


    const productImages: any[] = product.productImages;
    const productImagesToFileHandle: FileHandle[] = [];

    for (let i = 0; i < productImages.length; i++) {
      const imageFileData = productImages[i];

      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);
      const imageFile = new File([imageBlob], imageFileData.Name, { type: imageFileData.type });
      
      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      productImagesToFileHandle.push(finalFileHandle);
    }

    product.productImages = productImagesToFileHandle;

    return product;

  }
  // will take the picture bytes and then it will create to blob

  public dataURItoBlob(picBytes: string, imageType: any) {

    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {

      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: imageType });

    return blob;

  }
}
