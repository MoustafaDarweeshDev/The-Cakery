import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router , NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { IOrder } from 'src/app/shared/Modules/Order';
import { CheckoutService } from '../checkout.service';

declare var Stripe: (arg0: string) => any;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements AfterViewInit ,OnDestroy{
@Input() checkoutForm:FormGroup
@ViewChild('cardNumber', {static:true}) CardNumberElement:ElementRef;
@ViewChild('cardExpiry', {static:true}) cardExpiryElement:ElementRef;
@ViewChild('cardCvc', {static:true}) CardCvcElement:ElementRef;
stripe:any
cardNumber:any
cardExpiry:any
cardCvc:any
cardErrors:any
loading=false;
cardNumberValid=false;
cardExpiryValid=false;
cardCvcValid=false;
cardHandler = this.onChange.bind(this)

  constructor(private basketService:BasketService ,
    private checkoutService:CheckoutService ,private toaster:ToastrService , private router:Router) { }

  ngAfterViewInit(): void {
    this.stripe = Stripe('pk_test_51LtqZCIesLrucQrD3FlNkMCVnhSTOWLG83Vkd3T91EbeA1hYHpv1qpgJsRPkNLhdiTkDOMRSG76UieNr7NYlVea300bgMoUBZs')
    const elements = this.stripe.elements();

    this.cardNumber=elements.create('cardNumber')
    this.cardNumber.mount(this.CardNumberElement.nativeElement)
    this.cardNumber.addEventListener('change',this.cardHandler)

    this.cardExpiry=elements.create('cardExpiry')
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement)
    this.cardExpiry.addEventListener('change',this.cardHandler)


    this.cardCvc=elements.create('cardCvc')
    this.cardCvc.mount(this.CardCvcElement.nativeElement)
    this.cardCvc.addEventListener('change',this.cardHandler)


  }
  onChange(event:any){
    console.log(event);

    if(event.error){
      this.cardErrors = event.error.message;
    }else{
      this.cardErrors = null;
    }

    switch(event.elementType){
      case 'cardNumber':
        this.cardNumberValid = event.complete;
      break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
      break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;

    }
  }
  async submitOrder(){
    this.loading=true;
    var basket = this.basketService.getCurrentBasket();
    try{

      const createdOrder= await this.createOrder(basket);
      const paymentResault = await this.confirmPaymentWithStrip(basket);

      if(paymentResault.paymentIntent){
        this.basketService.deleteBasket(basket);
        const navigateExtra : NavigationExtras = {state:createdOrder}
        this.router.navigate(['checkout/success'],navigateExtra)
      }else{
        this.toaster.error('payment Failed')
      }
      this.loading=false;

    }catch(error){
      console.log(error);
      this.loading=false;

    }



  }
  private async confirmPaymentWithStrip(basket: any) {
    return this.stripe.confirmCardPayment(basket.clientSecret,{
      payment_method:{
        card:this.cardNumber,
        billing_details:{
          name:this.checkoutForm.get('PaymentForm')?.get('nameOnCard')?.value
        }
      }
    })
  }
  private async createOrder(basket: any) {
    var orderToCreate = this.getOrderToCreate(basket);
    return this.checkoutService.creatOrder(orderToCreate).toPromise();

  }

  getOrderToCreate(basket: any) {
    return{
      basketId: basket.id,
      deliveryMethodId: + this.checkoutForm.get('deliveryForm')?.get('deliveryMethod')?.value,
      shippingToAdress: this.checkoutForm.get('addressForm')?.value,
    }
  }

  ngOnDestroy(): void {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }
}
