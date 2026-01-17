import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { Orders } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {

  constructor(
    private http: HttpClient,
    ) { }

  fetchOrderList(userID: any): Observable<Orders[]> {
    const body = {
      jsonrpc: '2.0',
      params: {
        user_id: userID,
      }
    }
    return this.http.post(`${environment.apiUrl}/order-list`, body)
      .pipe(map((response: any) => {
        const loadedOrder: Orders[] = [];
        if (response.result.code===200) {
          response.result.data.forEach((data: any) => {
            const order: Orders = {
              id: data.id,
              orderName: data.order_name,
              customer: data.customer,
              createDate: data.create_date,
              total: data.total,
              state: data.state
            };
            loadedOrder.push(order);
          });
        }
        return loadedOrder;
      })
    );
  }
}
