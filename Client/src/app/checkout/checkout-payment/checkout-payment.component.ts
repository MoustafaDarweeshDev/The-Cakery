import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router , NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { IOrder } from 'src/app/shared/Modules/Order';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit {
@Input() checkoutForm:FormGroup
  constructor(private basketService:BasketService ,
    private checkoutService:CheckoutService ,private toaster:ToastrService , private router:Router) { }

  ngOnInit(): void {
  }

  submitOrder(){
    var basket = this.basketService.getCurrentBasket();
    var orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.creatOrder(orderToCreate).subscribe((order:IOrder)=>{
      this.toaster.success('order created succssfully')
      this.basketService.deleteLocalBasket();
      const navigateExtra : NavigationExtras = {state:order}
      this.router.navigate(['checkout/success'],navigateExtra)
    },err=>{
      this.toaster.error('something went wrong')
      console.log(err);

    });
  }

  getOrderToCreate(basket: any) {
    return{
      basketId: basket.id,
      deliveryMethodId: + this.checkoutForm.get('deliveryForm')?.get('deliveryMethod')?.value,
      shippingToAdress: this.checkoutForm.get('addressForm')?.value,
    }
  }
}
