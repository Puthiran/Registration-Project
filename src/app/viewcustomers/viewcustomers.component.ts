import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppserviceService } from '../appservice.service';

@Component({
  selector: 'app-viewcustomers',
  templateUrl: './viewcustomers.component.html',
  styleUrls: ['./viewcustomers.component.css']
})

export class ViewcustomersComponent implements OnInit {
  routeflag: any;
  public rowsOnPage: number = 10;
  page=1;
  constructor( private appservice: AppserviceService,private router: Router) { }
  custdata:any;
  custdatacopy:any;
  ngOnInit(): void {
    this.routeflag=2;
    this.appservice.getCustomers().subscribe(data=>{
    this.custdata=data;this.custdatacopy=data;
    });
  }

  route(indexval) {
    if (indexval == 1) {
      this.router.navigate(['/register']);
    } else {
      this.router.navigate(['/viewcustomers']);
    }
  }

    //search customers
    searchcustomers(event:any){
      if(event.length>0){
        //===0  starts with
        let srch = Object.assign([], this.custdata).filter(
        item => ((item.firstname.toLowerCase()).indexOf(event.toLowerCase()) !== -1 || (item.mobileno.toLowerCase()).indexOf(event.toLowerCase()) !== -1));
        this.custdata=srch;
      }else{
        this.custdata=this.custdatacopy;
      }
     
    }


}
