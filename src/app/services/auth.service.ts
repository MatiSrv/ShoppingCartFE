import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/AuthResponse';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { UserRequest } from '../models/UserRequest';
import { jwtDecode } from "jwt-decode"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<AuthResponse> = new BehaviorSubject<AuthResponse>({token:''}); 
  
  constructor(private http:HttpClient) {
    let user = sessionStorage.getItem('currentUser');
    if(user){
      this.currentUserData.next(JSON.parse(user));
      this.currentUserLoginOn.next(true);
    }
   }


  private url:string = 'http://localhost:8080/auth/login';

  login(credentials: UserRequest):Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url, credentials).pipe(
      tap((user: AuthResponse) => {
       
        sessionStorage.setItem('token', user.token);
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserData.next(user);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('An error occurred:', error.error);
    }else{
      console.error( `backend returned code ${error.status}, body was: ${error.error} `)
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getDecodedToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUserIdFromToken(): string | null {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = this.getDecodedToken(token);
      return decodedToken ? decodedToken.userId : null; 
    }
    return null;
  }

  logOut(){
  
    sessionStorage.removeItem('token');
    this.currentUserData.next({token:''});
    this.currentUserLoginOn.next(false);
  }

  getToken():string{
    return this.currentUserData.value.token;
  }

  isLogged():boolean{
    return this.currentUserLoginOn.value;
  }
}


