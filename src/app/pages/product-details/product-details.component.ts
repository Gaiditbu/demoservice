/**import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: number;
  product: Product; 

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id');
      this.fetchProductDetails();
    });
  }

  fetchProductDetails(): void {
    // Use your ProductService to fetch product details
    this.productService.getProductById(this.productId).subscribe(product => {
      this.product = product;
    });
  }
}*/
