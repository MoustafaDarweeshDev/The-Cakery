import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDeliveryMethod } from '../shared/Modules/DeliveryMethod';
import { IProduct } from '../shared/Modules/Product';
import { Basket, IBasket, IBasketItem, IBasketTotal } from './basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl
  basket = new BehaviorSubject<IBasket | null>(null);
  basketTotal = new BehaviorSubject<IBasketTotal | null>(null);
  shipping=0;


  constructor(private http:HttpClient) { }

  setShippingPrice(shippingMethod:IDeliveryMethod){
    this.shipping = shippingMethod.price
    this.calculateTotal()
  }
  getBasket(id :string){
    return this.http.get<IBasket>(this.baseUrl + 'Basket?id=' + id).pipe(
      map((res:IBasket)=>{
        this.basket.next(res)
        this.calculateTotal();

      })
    )
  }

  setBasket(basket:IBasket){
    return this.http.post<IBasket>(this.baseUrl+'basket' ,basket).subscribe(
      (res:IBasket)=>{
        this.basket.next(res)
        this.calculateTotal()

      },err=>{
        console.log(err);

      }
    )
  }

  getCurrentBasket(){
    return this.basket['_value']
  }

  addToBasket(product:IProduct , quantity = 1){
   const itemToAd : IBasketItem = this.mapProductToCartItem(product , quantity)
   const basket = this.getCurrentBasket() ?? this.createBasket()
   basket.items = this.addOrUpdateBasket(basket.items , itemToAd , quantity)
   this.setBasket(basket)
  }

  incrementItemQuantity(item :IBasketItem){
   const basket = this.getCurrentBasket();
   const foundItemIndex = basket.items.findIndex((i:IBasketItem) => i.id === item.id);
   basket.items[foundItemIndex].quantity++;
   this.setBasket(basket);
  }

  decrementItemQuantity(item :IBasketItem){
    const basket = this.getCurrentBasket();
    const foundItemIndex = basket.items.findIndex((i:IBasketItem) => i.id === item.id);
    if(basket.items[foundItemIndex].quantity > 1){
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    }else{
      this.removeItemFromBasket(item);
    }
   }

   removeItemFromBasket(item:IBasketItem){
    const basket = this.getCurrentBasket();
    if(basket.items.some((i:IBasketItem)=>i.id === item.id)){
      basket.items = basket.items.filter((i:IBasketItem)=>i.id != item.id)
      if(basket.items.lenght > 0 ){
        this.setBasket(basket)
      }else{
        this.deleteBasket(basket)
      }
    }

   }

   deleteLocalBasket(){
    this.basket.next(null)
    this.basketTotal.next(null)
    localStorage.removeItem('basket_id')
   }

   deleteBasket(item:IBasketItem){
    this.http.delete(this.baseUrl+'basket?id=' + item.id).subscribe(
      ()=>{
        this.basket.next(null)
        this.basketTotal.next(null)
        console.log('deleted');

        localStorage.removeItem('basket_id')

      },err=>{
        console.log(err);

      }
    )
   }
  private calculateTotal(){
    const basket = this.getCurrentBasket();
    const shipping = this.shipping;
    let x = basket.items
    const subTotal = basket.items.reduce((a:number, b:IBasketItem) => (b.price * b.quantity) + a, 0);
    const total =shipping+subTotal
    this.basketTotal.next({shipping , subTotal ,total})

  }

  private addOrUpdateBasket(items:IBasketItem[] , itemToAd:IBasketItem , quantity:number){
   const index =  items.findIndex(i=>i.id == itemToAd.id)
   if(index === -1){
    items.push(itemToAd)
   }else{
    items[index].quantity += quantity
   }
   return items
  }
  private mapProductToCartItem(product:IProduct , quantity:number){
    return {
      id:product.id,
      productName: product.name,
      price: product.price,
      quantity,
      pictureUrl: product.pictureUrl,
      brand: product.productBrand,
      type: product.productType
    }
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id' , basket.id)
    return basket
  }



}


