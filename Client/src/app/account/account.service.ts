import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/Modules/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl
  user = new BehaviorSubject<IUser | null>(null);
  constructor(private http:HttpClient ,private router:Router) {
    // if(localStorage.getItem('token')){
    //   this.saveUserData()
    // }
  }


  getCurrentUser(){
    return this.user.getValue();
  }



  loadCurrentUser2(token:string){
    let header = new HttpHeaders();
    header=header.set('Authorization',`Bearer ${token}` )
    console.log(header);

    return    this.http.get<IUser>(this.baseUrl+'account'+ {header}).pipe(
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('token' , user.token)
          this.user.next(user);
        }
      })
    )
  }

  // saveUserData(){
  //   const token =localStorage.getItem('token');
  //   if(token){
  //     let encodedToken = JSON.stringify(token);
  //     let decodedToken:any = jwtDecode(encodedToken)
  //     this.user.next(decodedToken)
  //   }
  // }

  login(value:any){
    return this.http.post<IUser>( this.baseUrl+'Account/Login' , value).pipe(
      map((user:IUser)=>{
        localStorage.setItem('token' , user.token)
        this.user.next(user)

      })
    )
  }

  register(value:any){
    return this.http.post<IUser>(this.baseUrl+'Account/register' , value).pipe(
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('token' , user.token)
        }
      })
    )
  }


  logOut(){
    localStorage.removeItem('token');
    this.user.next(null);
    this.router.navigate(['/home'])
    console.log(this.user.getValue());

  }

  checkEmailExist(email:string){
    this.http.get(this.baseUrl+'Account/emailexisit?email='+email)
  }
}
