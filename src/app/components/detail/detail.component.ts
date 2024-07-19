import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  productId:number = this.route.snapshot.params['id'];
  productForm!:FormGroup;
  product!:Product;
  userId!:number;
  constructor(private productService:ProductService, 
            private router:Router, 
            private route:ActivatedRoute,
            private cartService:CartService,
            private authService:AuthService,
            private fb:FormBuilder

  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.userId = Number(this.authService.getUserIdFromToken());

    this.productForm = this.fb.group({
      quantity:[1,[Validators.required, Validators.min(1)]]
    });
  }

  getProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  
    addToCart(){
      this.cartService.addProductToCart({userId:this.userId,productId:this.productId},this.quantity?.value).subscribe({
        next: (cart) => {
         this.productAddedNotification();
          this.quantity?.setValue(1);
        },
        error: (error) => {
          console.error('There was an error!', error);
          alert('There was an error adding the product to the cart');
        }
      });
    }

  get quantity(){
    return this.productForm.get('quantity');
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
