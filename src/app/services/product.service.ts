import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }


  public getProducts():Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:8080/products');
  }

  public getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(`http://localhost:8080/products/${id}`);
  } 
}
