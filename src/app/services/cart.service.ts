import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../model/product.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  addToCartEvent = new Subject<Product>();

  constructor(private http: HttpClient) { }

  addToCart(product: Product): void {
    this.addToCartEvent.next(product);
  }

  createSaleOrder(userID: any, orderLine: Product[]) {
    const body = {
      jsonrpc: '2.0',
      params: {
        user_id: userID,
        order_line: orderLine
      }
    }

    return this.http.post(`${environment.apiUrl}/create-order`, body)
      .pipe(map(response => {
        return response;
      },
    ))
  }

}
