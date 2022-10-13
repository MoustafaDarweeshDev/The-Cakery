import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { IDeliveryMethod } from 'src/app/shared/Modules/DeliveryMethod';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.css']
})
export class CheckoutDeliveryComponent implements OnInit {
@Input() checkoutForm:FormGroup
deliveryMethods:IDeliveryMethod[]
  constructor(private checkoutService:CheckoutService,private basketService:BasketService) { }

  ngOnInit(): void {
    this.getDeliveryMethods();
  }
  getDeliveryMethods(){
    this.checkoutService.getDeliverymethods().subscribe((dm:IDeliveryMethod[])=>{
    this.deliveryMethods = dm;

    },err=>{
      console.log('err');
      console.log(err);

    })
  }

  setShippingPrice(shippingMethod:IDeliveryMethod){
    this.basketService.setShippingPrice(shippingMethod)
  }
}
