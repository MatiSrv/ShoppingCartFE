import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cart } from '../models/Cart';
import { CartRequest } from '../models/CartRequest';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }


  private url: string = 'http://localhost:8080/cart';
  private cartItemCount = new BehaviorSubject<number>(0);
  currentCartData: BehaviorSubject<Cart> = new BehaviorSubject<Cart>({ id: 0, userId: 0, items: [] });

  cartItemCount$ = this.cartItemCount.asObservable();


  getCartByUserId(userId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.url}/user/${userId}`).pipe(
      tap((cart: Cart) => {
        this.cartItemCount.next(cart.items.length);
        this.currentCartData.next(cart);
      })
    );
  }

  addProductToCart(cartRequest: CartRequest, quantity: number): Observable<Cart> {
    return this.http.post<Cart>(`${this.url}/add?quantity=${quantity}`, cartRequest).pipe(
      tap((cart: Cart) => {
        this.cartItemCount.next(cart.items.length);
        this.currentCartData.next(cart);
      })
    );
  }

  updateProductQuantity(cartRequest: CartRequest, quantity: number): Observable<Cart> {
    return this.http.put<Cart>(`${this.url}/update?quantity=${quantity}`, cartRequest).pipe(
      tap((cart: Cart) => {
        this.cartItemCount.next(cart.items.length);
        this.currentCartData.next(cart);
      })
    );
  }

  deleteProduct(cartRequest: CartRequest): Observable<Cart> {
    const { userId, productId } = cartRequest;
    return this.http.delete<Cart>(`${this.url}/remove?userId=${userId}&productId=${productId}`).pipe(
      tap((cart: Cart) => {
        this.cartItemCount.next(cart.items.length);
        this.currentCartData.next(cart);
      })
    );
  }


  clearCart(id: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.url}/clear/${id}`).pipe(
      tap((cart: Cart) => {
        this.cartItemCount.next(cart.items.length);
        this.currentCartData.next(cart);
      })
    );
  }
}
