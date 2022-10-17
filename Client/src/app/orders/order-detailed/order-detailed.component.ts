import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/Modules/Order';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.css']
})
export class OrderDetailedComponent implements OnInit {
  order:IOrder
  constructor(private activatedRoute:ActivatedRoute,private orderService:OrdersService) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(){
    this.orderService.getOrderDetailed(+this.activatedRoute.snapshot.params[('id')]).subscribe(res=>{
      this.order=res
    })
  }
}
