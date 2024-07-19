import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  userId!:number;

  products:Product[] = [];
  constructor(private productService:ProductService,
              private router:Router,
              private cartService:CartService,
              private authService:AuthService,
            
            ) { }

  ngOnInit(): void {
    this.getProducts(); 
    this.userId = Number(this.authService.getUserIdFromToken());
    this.getCart();
  }

  getCart(){
    this.cartService.getCartByUserId(this.userId).subscribe({
      next: (cart) => {
        console.log(cart);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  getProducts(){
    this.productService.getProducts().subscribe(
      {
        next:(data) => {
          this.products = data;
        },
        error:(error) => {
          console.error('There was an error!', error);
        }
      }
    );
  }

  isProductAvailable(product:Product):boolean{
    return product.stock > 0;
  }

  seeDetail(id:number){
    this.router.navigate([`home/products/detail/${id}`]);
  }

  addProductToCart(event:Event,id:number){
    event.stopPropagation();
    this.cartService.addProductToCart({userId:this.userId,productId:id},1).subscribe({
      next: (cart) => {
     
      },
      error: (error) => {
        console.error('There was an error!', error);
        alert('There was an error adding the product to the cart');
      }
    });
  }


  productAddedNotification(){
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Product added to the cart"
    });
  }
}
