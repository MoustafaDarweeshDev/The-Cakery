import { Component, OnInit } from '@angular/core';
import { IOrder } from '../shared/Modules/Order';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders:IOrder[]
  constructor(private ordersService:OrdersService) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this.ordersService.getOrdersForUser().subscribe(res=>{
      this.orders = res;
    },err=>{
      console.log(err);

    })
  }

}
