import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-search',
  templateUrl:'./search.component.html',
  styles:[
    
  ]
})
export class SearchComponent {
  searchItem:String="";
  loc:String="";
  error:String="";
  constructor(private dataService:DataService, private sharedService:SharedService){

  }
  getItem(){
    console.log(this.searchItem);
  }
  getLoc():void{
    console.log(this.getLoc);
  }
  cnt:number=0;
  getInput():void{
    if(this.searchItem!="" && this.loc!=""){
      this.error=""
      console.log("going to search " + this.searchItem + " at " + this.loc);
      this.sendData();
      this.sharedService.buttonClickEvent.emit();
      if(this.cnt==0){
        this.sendData();
      this.sharedService.buttonClickEvent.emit();
      this.cnt++;
      }
      
    }
    else{
      this.error="invalid input";
    }
  }
  valid():boolean{
    if(this.searchItem!="" || this.loc!=""){
      return false;
    }
    return true;
  }
  sendData() {
    const data = {name: this.searchItem, loc: this.loc }; 
    console.log(data.name + ' '+ data.loc);
    this.dataService.sendData(data);
  }
}
