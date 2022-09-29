import { Component, OnInit } from '@angular/core';
import { IBrand } from 'src/app/shared/Modules/Brand';
import { IPagination } from 'src/app/shared/Modules/Pagination';
import { IProduct } from 'src/app/shared/Modules/Product';
import { ProductParams } from 'src/app/shared/Modules/ProductParams';
import { IType } from 'src/app/shared/Modules/productType';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products:IProduct[];
  brands:IBrand[];
  types:IType[];
  productParams = new ProductParams();
  sortOptions=[
    {name :'Alphabetical' , value:'name'},
    {name :'Price: Low to High' , value:'priceasc'},
    {name :'Alphabetical' , value:'pricedesc'},
  ]
  totalCount:number;
  term=''

  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.getAllProducts()
    this.getAllBrands()
    this.getAllTypes()
  }

  getAllProducts(){
    this.shopService.getAllProducts(this.productParams).subscribe(
      (res)=>{
        res? this.products = res.data : res
        res?this.productParams.pageNumber = res?.pageIndex:res
        res?this.productParams.pageSize = res?.pageSize:res

        // console.log(this.productParams.pageNumber.toString());

        res?this.totalCount = res?.count:res
      },(err)=>{
        console.log(err);
      }
    )
  }

  getAllBrands(){
    this.shopService.getBrands().subscribe({
      next:(res)=>{
        this.brands =[{id:0,name:'All'} , ...res];
      },

    })
  }

  getAllTypes(){
    this.shopService.getTypes().subscribe({
      next:(res)=>{
        this.types =[{id:0,name:'All'} , ...res];
      }
    })
  }

   onBrandSelected(brandId:number){
    this.productParams.brandId = brandId
    this.productParams.pageNumber =1;
    this.getAllProducts()

  }

  onTypeSelected(typeId:number){
    this.productParams.typeId = typeId
    this.productParams.pageNumber =1;
    this.getAllProducts()
  }

  onSortSelected(sort:string){
    this.productParams.sort =sort
    this.productParams.pageNumber =1;
    this.getAllProducts()
  }

  onPageChange(event:any){
    console.log(event);
    console.log(this.productParams.pageNumber);


    if(event != this.productParams.pageNumber){
      this.productParams.pageNumber = event;
      this.getAllProducts()
    }
  }

  onSearch(term:string){
      this.productParams.search=term
      this.getAllProducts();

  }
  onReset(){
    this.term=''
  }
}
