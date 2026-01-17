import { Product } from './../../model/product.model';
import { Component, OnInit } from '@angular/core';
import { OrderDetailsService } from 'src/app/services/order-details.service';
import { Cart } from 'src/app/model/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from 'src/app/services/account.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products: Product[] = [];
  cartItems: Cart[] = [];
  cartRender: Cart[] = []

  constructor(
    private orderDetailsService: OrderDetailsService,
    private cartService: CartService,
    private message: NzMessageService,
    private currentUser: AccountService
  ) { }

  addToCart(product: Product): void {
    const existingCartItem = this.cartItems.find(cartItem => cartItem.product?.id === product.id);

    if (existingCartItem) {
      existingCartItem.quantity++;
      this.message.create("warning", "Update item successfuly!");
    } else {
      const newCartItem: Cart = {
        product,
        quantity: 1
      };

      this.cartItems.push(newCartItem);
      this.message.create("success", "Add to cart successfuly!");
    }
    this.saveCartToLocalStorage();
  }

  removeFromCart(cartItem: Cart): void {
    this.cartItems = this.cartItems.filter(item => item !== cartItem);
    this.saveCartToLocalStorage();
    this.message.create("danger", "Remove item successfuly!");
  }

  updateQuantity(cartItem: Cart): void {
    if (cartItem.quantity <= 0) {
      this.removeFromCart(cartItem);
    }
    this.saveCartToLocalStorage();
    this.message.create("warning", "Update item successfuly!");
  }

  calculateCartTotal(): number {
    let total: number = 0;

    this.cartItems.forEach(cartItem => {
        if (cartItem.product) {
            total += cartItem.quantity * (cartItem.product.foodPrice || 0);
        }
    });

    return total;
  }

  saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  initializeCart(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        this.cartItems = JSON.parse(storedCart);
    } else {
        this.cartItems = [];
    }
  }

  checkoutOrder() {
    const cartItems = localStorage.getItem('cart');
    const userID = this.currentUser.userValue?.id
    if (userID && cartItems) {
      const parsedCartItems = JSON.parse(cartItems);
  
      this.cartService.createSaleOrder(userID, parsedCartItems)
        .pipe(first())
        .subscribe({
          next: (response: any) => {
            if (response.result.code === 200) {
              this.message.create("success", response.result.message);
              this.cartItems = [];
              localStorage.removeItem('cart');
            } else {
              this.message.create("danger", "Checkout failed!");
            }
          },
          error: error => {
            this.message.create("danger", error);
          }
        })
    }
  }

  ngOnInit(): void {
    this.orderDetailsService.fetchProducts()
    .subscribe((products: Product[]) => {
      this.products = products;
    })

    this.initializeCart();
    this.cartService.addToCartEvent.subscribe((product: Product) => {
      this.addToCart(product);
    });
  }
}
