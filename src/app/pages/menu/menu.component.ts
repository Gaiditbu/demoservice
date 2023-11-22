import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { OrderDetailsService } from 'src/app/services/order-details.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private service:OrderDetailsService) { }
  foodData:any;
  ngOnInit(): void {
    this.service.fetchProducts()
    .subscribe((products: Product[]) => {
      this.foodData = products;
    })
    // this.foodData = this.service.foodDetails;

    //USE API 
  }

}