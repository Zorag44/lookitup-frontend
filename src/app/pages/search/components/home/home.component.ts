import { Component,OnInit, OnDestroy } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { messaging } from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { SharedService } from 'src/app/shared.service';
import { TwilioService } from 'src/app/twilio.service';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit,OnDestroy {
  constructor(private userService:UserService,
     private dataService:DataService,
     private sharedService:SharedService,
     private twilioService:TwilioService){
    this.sub.unsubscribe();
  }
  ind:Number=1;
  data:any;
  userData:any[]=[{
    name:"",
    phone:0,
    loc:"",
    isAvailable:""
  }];
  private sub:Subscription=new Subscription;
  private cnt:number=0;
  isBtnActive:boolean=false;
  ngOnInit(): void {
    if(this.cnt>0){
      return;
    }
    for(const key in this.userData){
      console.log(this.userData[key].name +' '+"this was ts iteration");
    }
    this.cnt=1;
    console.log("reached");
    this.sub=this.sharedService.buttonClickEvent.subscribe(
      ()=>{
        console.log("reached");
        
        this.dataService.data$.subscribe(
          data=>{
            this.data=data;
            console.log(this.data);
            console.log("reached");
            this.userService.getUsers({'loc':data.loc}).subscribe(
              (response)=>{
                this.userData=response;
                if(this.userData.length>0){
                  this.isBtnActive=true;
                }
                else{
                  this.isBtnActive=false;
                }
                console.log(this.userData);
                
                for(const key in this.userData){
                  console.log(this.userData[key].loc +' '+"this was ts iteration");
                }
                this.ngOnInit();
              }
            );
            
          }
        );
        
      }
    );
  }
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
    // this.cnt=0;
  }
  checkAvailability(){
    // for(const key in this.userData){
    //   this.sendSMS(this.userData[key].phone);
    //   this.userData[key].isAvailable=this.res;
    // }
    this.sendSMS("+919693766858");
    console.log(this.res);
    
  }
  res:String="";
  sendSMS(toPhoneNumber:String){
    this.twilioService.sendSMS(toPhoneNumber,this.data.name).then(
      resp=>{
        this.res=resp;
      }
    ).catch(
      error=>{
        console.error("error");
      }
    )
  }
}
