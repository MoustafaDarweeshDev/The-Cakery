import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private accountService:AccountService , private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      email:new FormControl('' , [Validators.required , Validators.pattern('')]),
      password:new FormControl('' , Validators.required),
    })
  }

  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe(res=>{

    },err=>{
      console.log(err);

    })
    this.router.navigate(['/shop'])
  }
}
