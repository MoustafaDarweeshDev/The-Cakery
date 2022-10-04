import { Component, OnInit } from '@angular/core';
import { IBasket, IBasketItem } from './basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basket:IBasket

  constructor(private basketService:BasketService) { }
  ngOnInit(): void {
    this.basketService.basket.subscribe(
      res=>{
        if(res){
          this.basket = res

        }
      }
    )

  }

  removeBasketItem(item:IBasketItem){
    this.basketService.removeItemFromBasket(item)
  }
  incrementItemQuantity(item:IBasketItem){
    this.basketService.incrementItemQuantity(item)
  }
  decrementItemQuantity(item:IBasketItem){
    this.basketService.decrementItemQuantity(item)
  }
}
