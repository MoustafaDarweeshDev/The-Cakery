import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { IBasket } from 'src/app/basket/basket';
import { BasketService } from 'src/app/basket/basket.service';
import { IUser } from 'src/app/shared/Modules/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private basketService:BasketService , private accountService:AccountService) { }
  basket:IBasket
  user:any
  isLogin=false
  ngOnInit(): void {
    this.loadBasket();
    this.loadUser();
  }


  loadBasket(){
    this.basketService.basket.subscribe(
      res=>{
        if(res){
          this.basket = res

        }
      }
    )
  }

  loadUser(){
    this.accountService.user.subscribe(
      {
        next:()=>{
          if(this.accountService.user.getValue() != null){
            this.user = this.accountService.user.getValue()
            this.isLogin = true
          }else{
            this.isLogin=false
          }
        }
      }
    )
  }

  logout(){
    this.accountService.logOut();
  }
}
