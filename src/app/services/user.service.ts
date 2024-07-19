import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequest } from '../models/UserRequest';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private url:string = 'http://localhost:8080/auth/register';



  register(userRequest:UserRequest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(this.url, userRequest);
  }

}
