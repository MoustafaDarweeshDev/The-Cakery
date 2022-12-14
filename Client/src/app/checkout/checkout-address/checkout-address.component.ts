import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { IAddress } from 'src/app/shared/Modules/Address';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css']
})
export class CheckoutAddressComponent implements OnInit {
@Input() checkoutForm:FormGroup
  constructor(private accountService:AccountService , private toaster:ToastrService) { }

  ngOnInit(): void {

  }
  saveUserAddress(){
    this.accountService.updateUserAddress(this.checkoutForm.get('addressForm')?.value).subscribe((res:IAddress)=>{
      this.toaster.success('Address Saved')
      this.checkoutForm.get('addressForm')?.reset(res);
    },err=>{
      this.toaster.error('something went wrong')
      console.log(err);

    })
  }

}
