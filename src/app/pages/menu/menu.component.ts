import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderDetailsService } from 'src/app/services/order-details.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
      private service:OrderDetailsService, 
      private cartService: CartService,
      private message: NzMessageService
    ) { }
  foodData:any;

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.message.create("success", "Add to cart successfuly!");
  }
  
  ngOnInit(): void {
    this.service.fetchProducts()
    .subscribe((products: Product[]) => {
      this.foodData = products;
    })
    // this.foodData = this.service.foodDetails;

    //USE API 
  }

}