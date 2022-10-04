import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './shared/Modules/Product';
import { IPagination } from './shared/Modules/Pagination';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cakery';



  constructor(private basketService:BasketService) {

  }
  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id');

    if(basketId){
      this.basketService.getBasket(basketId).subscribe(()=>
      console.log('basket set'),
      err=>{
          console.log(err);
        } );

    }
  }
}
