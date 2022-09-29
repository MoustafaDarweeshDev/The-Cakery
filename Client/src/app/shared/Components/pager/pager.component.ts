import { Component, OnInit, Output , Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
@Input() totalCount:number
@Input() pageSize:number
@Output() pageChange = new EventEmitter<number>()
  constructor() { }

  ngOnInit(): void {
  }

  onPagerChange(event:any){
    this.pageChange.emit(event)
  }
}
