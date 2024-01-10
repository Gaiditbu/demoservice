/**import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProductById(productId: number) {
    throw new Error('Method not implemented.');
  }
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) { }
  addProduct(data: product) {
    this.cartData.emit([...this.getCart(), data]);
  
  }

}*/