import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError,tap } from "rxjs/operators";
import { User } from "./user.model";
import { environment } from '../../environments/environment';

export interface AuthApiResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean
}

@Injectable({providedIn:'root'})
export class AuthService{
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer :any;
  constructor(private http:HttpClient,private router: Router){}

  signup(email: string,password:string){
   return this.http.post<AuthApiResponse>(

      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.errorHandler),
    tap(userData => {
      this.authHandle(userData.email,userData.localId,userData.idToken,+userData.expiresIn);
    }));
  }

  login(email:string,pass: string){
     return this.http.post<AuthApiResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
      {
          email: email,
          password: pass,
          returnSecureToken: true
      }).pipe(catchError(this.errorHandler),
      tap(userData => {
        this.authHandle(userData.email,userData.localId,userData.idToken,+userData.expiresIn);
      }));
  }

  private authHandle(email: string,id: string,token: string,expiresIn:number){
    const tokenExpirationDate = new Date(new Date().getTime() + expiresIn *1000);
    const user = new User(email,id,token,tokenExpirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData',JSON.stringify(user));
  }
  private errorHandler(errorResponse: HttpErrorResponse){
    let errorMessage = 'An unknown error occured';
    if(!errorResponse.error || !errorResponse.error.error){
      return throwError(errorMessage);
    }
    console.log(errorResponse);
    switch(errorResponse.error.error.message){
      case 'EMAIL_NOT_FOUND':
        errorMessage='Email Doesnot Exists';
        break;
      case 'INVALID_PASSWORD' :
        errorMessage = 'Password Incorrect';
        break;
      case 'USER_DISABLED' :
        errorMessage = 'User Locked';
        break;
      case 'EMAIL_EXISTS':
        errorMessage='Email Already Exists';
        break;
    }
    return throwError(errorMessage);
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    //localStorage.clear();
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogin(){
    const loaderUser :{
      email:string,
      id:string,
      _token:string,
      _tokenExpirationDate:string
    } = JSON.parse(localStorage.getItem('userData'));
    //console.log(loaderUser);
    if(!loaderUser){
      return;
    }
   const user = new User(loaderUser.email,loaderUser.id,loaderUser._token,new Date(loaderUser._tokenExpirationDate));
   if(user.token){
    this.user.next(user);
    const expirationDuration = new Date(loaderUser._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
   }
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer =  setTimeout(() => {
      this.logout();
    },expirationDuration);
  }
}
