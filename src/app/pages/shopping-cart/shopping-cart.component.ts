import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderDetailsService } from 'src/app/services/order-details.service';
const apiUrl = 'http://localhost:8069/api/v1/product-list';

interface Product {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
}

interface CartItem {
    product: Product;
    quantity: number;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products: Product[] = [];
  cartItems: CartItem[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.httpClient.get<Product[]>('http://localhost:8069/products').subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: Product): void {
    const existingCartItem = this.cartItems.find(cartItem => cartItem.product.id === product.id);

    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      const newCartItem: CartItem = {
        product,
        quantity: 1
      };

      this.cartItems.push(newCartItem);
    }
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartItems = this.cartItems.filter(item => item !== cartItem);
  }

  updateQuantity(cartItem: CartItem): void {
    if (cartItem.quantity <= 0) {
      this.removeFromCart(cartItem);
    }
  }

  calculateCartTotal(): number {
    let total: number = 0;

    for (const cartItem of this.cartItems) {
      total += cartItem.quantity * cartItem.product.price;
    }

    return total;
  }
}
