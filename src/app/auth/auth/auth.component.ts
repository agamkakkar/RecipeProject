import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthApiResponse, AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error:string = null;
  ;
  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {

  }

  onSwitchAuthMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm){
    let authObservable : Observable<AuthApiResponse>;
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const pass = form.value.password;
    this.isLoading = true;
    if(this.isLoginMode){
      authObservable = this.authService.login(email,pass);
    }
    else {
      authObservable= this.authService.signup(email,pass);
    }
    authObservable.subscribe(
      responseBody => {
        console.log(responseBody);
        this.isLoading= false;
        this.router.navigate(['/recipes']);
      },errorMessage => {
        this.isLoading= false;
        //console.log(error);
        this.error = errorMessage;
      }
    );
    form.reset();
  }
  onCloseModal(){
    console.log('error');
    this.error= null;
  }
}
