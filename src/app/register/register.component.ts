import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppserviceService } from '../appservice.service';
import { Toaster } from "ngx-toast-notifications";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  Email = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  countrylist=[
    { cid:1, cname: "India"},
    { cid:2, cname: "Pakistan"},
    { cid:3, cname: "China"}
  ]

  selstatelist=[];
  statelist=[
    { sid:1, cid:1, sname: "Tamil Nadu"},
    { sid:2, cid:1, sname: "Andhra Pradesh"},
    { sid:3, cid:1, sname: "Kerala"},
    { sid:4, cid:2, sname: "Islamabad"},
    { sid:5, cid:2, sname: "Azad Kashmir"},
    { sid:6, cid:2, sname: "Federal"},
    { sid:7, cid:3, sname: "Beijing"},
    { sid:8, cid:3, sname: "Gansu"},
    { sid:9, cid:3, sname: "Hunan"},
  ]

  selcitylist=[];
  citylist=[
    { cyid:1, sid:1, cyname: "Tirunelveli"},
    { cyid:2, sid:1, cyname: "Chennai"},
    { cyid:3, sid:2, cyname: "Nellore"},
    { cyid:4, sid:2, cyname: "Gundur"},
    { cyid:5, sid:3, cyname: "Cochin"},
    { cyid:6, sid:3, cyname: "Ernakulam"},
    { cyid:7, sid:4, cyname: "Islamabad"},
    { cyid:8, sid:5, cyname: "Mirpur"},
    { cyid:9, sid:6, cyname: "Federal"},
    { cyid:10, sid:7, cyname: "Aihui"},
    { cyid:11, sid:7, cyname: "Akqi"},
    { cyid:12, sid:8, cyname: "Jiuquan"},
    { cyid:13, sid:9, cyname: "Changde"},
  ]
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appservice: AppserviceService,
    private toaster: Toaster
  ) {}

  routeflag: any;
  ngOnInit() {
    this.routeflag=1;
    this.registerForm 
    = this.fb.group({
      firstname: ["", [Validators.required, Validators.pattern("[a-zA-Z _.]*")]],
      lastname: ["", [Validators.pattern("[a-zA-Z _.]*")]],
      email: ["", [Validators.pattern(this.Email)]],
      mobileno: ["", [Validators.required, Validators.pattern("[0-9]*")]],
      address1:["",Validators.required],
      address2:["",[]],
      dob:["",[Validators.required]],
      countryname:["",[]],
      country:["opt1",[]],
      statename:["",[]],
      state:["opt1",[]],
      cityname:["",[]],
      city:["opt1",[]],
      idtype:["opt1",[Validators.required]],
      idno:["",[Validators.pattern("[a-zA-Z0-9]*")]]
    });
  }

  dobvalidate(dob:any){
      let seldate=new Date(dob);
      let curdate=new Date();
      if(seldate>curdate){
        this.registerForm.get('dob').setValue('');
        this.toaster.open({
          text: "Slect Valid Date of Birth!..",
          caption: "Alert MSG",
          type: "warning"
        });
      }
  }

  Registervalidate(){
    let dob=this.registerForm.get('dob').value;
    let countryid=this.registerForm.get('country').value;
    let statid=this.registerForm.get('state').value;
    let cityid=this.registerForm.get('city').value;
    if(dob==''||dob==null||dob==undefined){
      this.toaster.open({
        text: "Date of Birth not be Empty!..",
        caption: "Alert MSG",
        type: "warning"
      });
      return false;
    }else if(countryid=='opt1'||countryid==''||countryid==null||countryid==undefined){
      this.toaster.open({
        text: "Select CountryID!..",
        caption: "Alert MSG",
        type: "warning"
      });
      return false;
    }else if(statid=='opt1'||statid==''||statid==null||statid==undefined){
      this.toaster.open({
        text: "Select SateID!..",
        caption: "Alert MSG",
        type: "warning"
      });
      return false;
    }else if(cityid=='opt1'||cityid==''||cityid==null||cityid==undefined){
      this.toaster.open({
        text: "Select CityID!..",
        caption: "Alert MSG",
        type: "warning"
      });
      return false;
    }
    return true;
  }

  Register() {
    let validflag=this.Registervalidate();
    if(validflag){
      let countryid=this.registerForm.get('country').value;
      let statid=this.registerForm.get('state').value;
      let cityid=this.registerForm.get('city').value;
      let subindx= this.countrylist.findIndex(p => p.cid==countryid);
      this.registerForm.get('countryname').setValue(this.countrylist[subindx].cname);
      let subindx1= this.statelist.findIndex(p => p.sid==statid);
      this.registerForm.get('statename').setValue(this.statelist[subindx1].sname);
      let subindx2= this.citylist.findIndex(p => p.cyid==cityid);
      this.registerForm.get('cityname').setValue(this.citylist[subindx2].cyname);
      //var obj={firstname:"ChithuPuthiran",laststname: "G", email: "chithup@gmail.com",mobileno: 9976004603};
      this.appservice.PushData(this.registerForm.value).subscribe(
        // Admire results
        data => {
          if (data) {
            this.toaster.open({
              text: "Register Successfully!..",
              caption: "Successs",
              type: "success"
            });
            setTimeout(() => {
              this.ngOnInit();
              //this.router.navigate(["/route"]);
            }, 1200);
          } else {
            // this.toaster.open({
            //   text: "Register Failed!..",
            //   caption: "Error",
            //   type: "danger"
            // });
          }
        },
        // Or errors :-(
        error => {
          // this.toaster.open({
          //   text: "Register Failed!..",
          //   caption: "Error",
          //   type: "danger"
          // });
          console.log(error);
        }
      );
    }
  }


  getstates(coid:any){
    this.registerForm.get('state').setValue('opt1');
    this.registerForm.get('city').setValue('opt1');
    let srch = Object.assign([], this.statelist).filter(
      item => ((item.cid.toString()).indexOf(coid) !== -1));
      this.selstatelist=srch;
  }

  getcities(sid:any){
    this.registerForm.get('city').setValue('opt1');
    let srch = Object.assign([], this.citylist).filter(
      item => ((item.sid.toString()).indexOf(sid) !== -1));
      this.selcitylist=srch;
  }

  route(indexval) {
    if (indexval == 2) {
      this.router.navigate(['/viewcustomers']);
    } else {
      this.router.navigate(['/register']);
    }
  }

}
