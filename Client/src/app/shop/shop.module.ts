import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop/shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    ShopComponent
  ]
})
export class ShopModule { }
