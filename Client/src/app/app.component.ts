import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './shared/Modules/Product';
import { IPagination } from './shared/Modules/Pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cakery';



  constructor() {

  }
  ngOnInit(): void {
  }
}
