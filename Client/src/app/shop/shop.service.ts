import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPagination } from '../shared/Modules/Pagination';
import { IBrand } from '../shared/Modules/Brand';
import {IType} from '../shared/Modules/productType'
import { ProductParams } from '../shared/Modules/ProductParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl="https://localhost:7158/api/";

  constructor(private http:HttpClient) { }

  getAllProducts(shopeParams:ProductParams)
  {
    let params = new HttpParams();

    if(shopeParams.brandId !=0){
      params = params.append('BrandId',shopeParams.brandId.toString())
    }
    if(shopeParams.typeId !=0){
     params = params.append('TypeId',shopeParams.typeId.toString())
    }
    if(shopeParams.search){
      params = params.append('Search',shopeParams.search)
    }

      params = params.append('Sort',shopeParams.sort)
      params = params.append('PageIndex' , shopeParams.pageNumber.toString())
      params = params.append('PageSize' , shopeParams.pageSize.toString())

    console.log(params.toString());

    return this.http.get<IPagination>(this.baseUrl +`Products` ,{observe:'response',params})
    .pipe(
      map(res=>res.body)
    );
  }
  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'Products/brands');
  }
  getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'Products/types');
  }
}
