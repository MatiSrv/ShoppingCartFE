import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, CartItem } from 'src/app/models/Cart';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
 
  isChecked: boolean = false;

  cart!: Cart;

  constructor(private cartService:CartService, private authService:AuthService,
              private router:Router
              
  ){}

  ngOnInit(): void {
    this.cartService.currentCartData.subscribe(cart => this.cart = cart);

  }


  getTotalProduct(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  getTotalCart(cart: Cart): number {
    let total: number = 0;

    for (let item of cart.items) {
      total += this.getTotalProduct(item);
    }

    return total
  }


  onQuantityChange(item: CartItem): void {
    const cartRequest = { userId: this.cart.userId, productId: item.product.id };
    this.cartService.updateProductQuantity(cartRequest, item.quantity).subscribe({
      next: (cart) => {

      },
      error: (err) => {
       alert('Error al actualizar la cantidad');
      }
    });
  }


  deleteProduct(item: CartItem): void {
    const cartRequest = { userId: this.cart.userId, productId: item.product.id };
    this.cartService.deleteProduct(cartRequest).subscribe({
      next: (cart) => {
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  seeProducts(){
  this.router.navigate(['/home/products']);
  }

  checkout(){
    Swal.fire({
      title: "Thank you for shopping with us!",
      text: "Your order has been placed successfully",
      icon: "success"
    });
    this.router.navigate(['/home/products']);
  }
}
