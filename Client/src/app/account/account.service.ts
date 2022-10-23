import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddress } from '../shared/Modules/Address';
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
    let headers = new HttpHeaders();
    headers=headers.set('Authorization',`Bearer ${token}` )

    // {headers: new HttpHeaders().set('Authorization', 'my-auth-token')}
    return    this.http.get<IUser>(this.baseUrl+'account', {headers}).pipe(
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('token' , user.token)
          this.user.next(user);
        }
      })
    )
  }

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
           this.user.next(user)

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
    return this.http.get(this.baseUrl+'Account/emailexisit?email='+email)
  }

  getUserAddress(){
    return this.http.get<IAddress>(this.baseUrl+'Account/address')
  }

  updateUserAddress(address:IAddress){
    return this.http.put<IAddress>(this.baseUrl + "Account/address", address)
  }
}
