import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBasket, IBasketItem } from 'src/app/basket/basket';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.css']
})
export class BasketSummaryComponent implements OnInit {
basket:IBasket
@Output() decrement:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
@Output() increment:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
@Output() remove:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
@Input() isBasket=true

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

  decrementItemQuantity(item:IBasketItem){
    this.decrement.emit(item);
  }
  incrementItemQuantity(item:IBasketItem){
    this.increment.emit(item)
  }
  removeBasketItem(item:IBasketItem){
    this.remove.emit(item)
  }
}
