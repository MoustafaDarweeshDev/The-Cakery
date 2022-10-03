import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRequestCounter=0

  constructor(private spinner:NgxSpinnerService) { }

  busy(){
    this.busyRequestCounter++;
    this.spinner.show(undefined,{
      type:'pacman',
      bdColor:'rgba(255,255,255,0.7)',
      color:'black'
    })
  }
  idle(){
    this.busyRequestCounter--;
    if(this.busyRequestCounter <= 0){
    this.busyRequestCounter =0
    this.spinner.hide()

    }
  }
}
