import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private route:Router , private toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError(err =>{
        if(err.status === 400){
          if(err.error.errors){
            throw err.error;
          }else{
            this.toastr.error(err.error.messge , err.error.statusCode)

          }

        }
         if(err.status === 401){
          this.toastr.error(err.error.messge , err.error.statusCode)
        }
        if(err.status === 404){
          this.route.navigateByUrl('/not-found')
        }
        if(err.status === 500){
          const navigationExtra:NavigationExtras ={state: {error:err.error }}
          this.route.navigateByUrl('/server-error' , navigationExtra)
        }

        return throwError(err);
      })
    );
  }
}
