import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { OrderDetailsService } from 'src/app/services/order-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  
  constructor(
    private service:OrderDetailsService,
    private router: Router,
    private account: AccountService
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
    .subscribe((products: Product[]) => {
      this.foodData = products;
      this.isFetching = false;
    }, (error) => {
      this.response_error = error
    });
  }

  ngOnInit(): void {
    this.onFecthProducts();
    // this.foodData = this.service.foodDetails;
  }
}
