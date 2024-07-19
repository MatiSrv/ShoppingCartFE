import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRequest } from 'src/app/models/UserRequest';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  
  ngOnInit(): void {
  }

  constructor(private fb:FormBuilder, private auth:AuthService,private router:Router){}

  loginForm = this.fb.group({
    email:[''],
    password:['']
  });



  login(){
    const user:UserRequest= {
      email:this.loginForm.value.email || '',
      password:this.loginForm.value.password || ''
    
    }

    this.auth.login(user).subscribe(
    {
      next: (data) => {
      
        this.router.navigate(['/home/products']);
       this.loginSuccessful()
      },
      error: (error) => {
        alert('Login failed');
        console.error('There was an error!', error)
      }
    });



  }

  loginSuccessful(){
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Signed in successfully"
    });
  }
}
