import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/Modules/Product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId:number
  product:IProduct;
  quantity=1

  constructor(private shopSerivce:ShopService ,
    private ar:ActivatedRoute ,
    private basketService:BasketService) {
    this.productId = this.ar.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.loadProduct(this.productId)
  }

  addItemToBasket(item:IProduct , quantity:number){
    this.basketService.addToBasket(item,quantity)
  }
  increamentQuantity(){
    this.quantity++;
  }
  decrementQuantity(){
    if(this.quantity>1){
      this.quantity--;
    }
  }

  loadProduct(id:number){
    this.shopSerivce.getProductById(id).subscribe(res=>{
      this.product =res;
      console.log(res);

    },err=>{
      console.log(err);
    })
  }
}
