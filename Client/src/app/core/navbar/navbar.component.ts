import { Component, OnInit } from '@angular/core';
import { IBasket } from 'src/app/basket/basket';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private basketService:BasketService) { }
  basket:IBasket
  ngOnInit(): void {
    this.basketService.basket.subscribe(
      res=>{
        if(res){
          this.basket = res

        }
      }
    )

  }

}
