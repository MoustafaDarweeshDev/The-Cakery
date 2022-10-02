import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private shopSerivce:ShopService , private ar:ActivatedRoute) {
    this.productId = this.ar.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.loadProduct(this.productId)
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
