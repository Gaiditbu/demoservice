import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/model/order.model';
import { Account } from 'src/app/model/user.model';
import { AccountService } from 'src/app/services/account.service';
import { OrderListService } from 'src/app/services/order-list.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  constructor(
    private orderService: OrderListService,
    private accountService: AccountService
  ) {}

  orderList:Orders[] = [];

  onFecthProducts() {
    const userID = this.accountService.userValue?.id

    this.orderService.fetchOrderList(userID)
    .subscribe({
      next: (orders: Orders[]) => {
        this.orderList = orders;
      }, 
      error: error => {
        console.log(error);
      } 
    });
  }

  ngOnInit(): void {
    this.onFecthProducts();
  }

}
