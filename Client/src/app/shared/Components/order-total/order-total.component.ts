import { Component, OnInit } from '@angular/core';
import { IBasketTotal } from 'src/app/basket/basket';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.css']
})
export class OrderTotalComponent implements OnInit {
  orderTotal:IBasketTotal
  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
    this.basketService.basketTotal.subscribe(
      res=>{
        if(res){
          this.orderTotal = res

        }
      }
    )
  }

}
