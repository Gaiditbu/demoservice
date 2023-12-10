import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { OrderDetailsService } from 'src/app/services/order-details.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  
  constructor(
    private service:OrderDetailsService,
    private router: Router,
    private account: AccountService,
    private cartService: CartService,
    private message: NzMessageService
    ) {
      if (this.account.userValue) {
        this.router.navigate(['/']);
      }
    }
  clicked = false;
  foodData:Product[] = [];
  isFetching = false;
  response_error: string = '';  
  error:any = null
  onFecthProducts() {
    this.isFetching = true;
    this.service.fetchProducts()
    .subscribe({
      next: (products: Product[]) => {
        this.foodData = products;
        this.isFetching = false;
      }, 
      error: error => {
        this.response_error = error
      } 
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.message.create("success", "Add to cart successfuly!");
  }

  ngOnInit(): void {
    this.onFecthProducts()
    // this.foodData =this.service.foodDetails;
  }

}
