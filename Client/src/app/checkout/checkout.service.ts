import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {IDeliveryMethod} from '../shared/Modules/DeliveryMethod'
import { IOrder, IOrderToCreate } from '../shared/Modules/Order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl= environment.apiUrl;
  constructor(private http:HttpClient) { }

  creatOrder(order:IOrderToCreate){
   return this.http.post<IOrder>(this.baseUrl + 'Orders' , order)
  }

  getDeliverymethods(){
    return this.http.get<IDeliveryMethod[]>(this.baseUrl + 'Orders/deliveryMethods').pipe(
      map((dm:IDeliveryMethod[])=>{
        return dm.sort((a,b)=> b.price - a.price)
      })
    )
  }
}
