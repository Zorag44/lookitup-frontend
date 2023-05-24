import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'


@Component({
  selector: 'app-register-sheet',
  templateUrl:'./register-sheet.component.html',
  styles: [
    `.px-5 {
      padding-left: 10rem;
      padding-right: 1.25rem;
  }`
  ]
})
export class RegisterSheetComponent {
  constructor(private http:HttpClient) {}
  httpOptions={
    headers: new HttpHeaders({
      'content-Type':'application/json'
    })
  };
  url:String='http://localhost:3000';
  name:String="";
  phone:Number=0;
  gstin:String="";
  loc:String="";
  password:String="";
  submit():void{
    if(this.name.length!=0 && this.phone.toString().length==10 && this.gstin.length!=0 && this.loc.length!=0){
      const user={
        name:this.name,
        phone:this.phone,
        gstin:this.gstin,
        loc:this.loc,
        password:this.password
      }
      console.log('reached');
      this.http.post(this.url+'/api/register',user,this.httpOptions).subscribe(
        response=>{
          console.log("data sent");
          alert("registered!");
        },
        error=>{
          alert('server error');
          console.error("could not send");
        }
        
      );
    }
    else{
      alert("invalid!!");
    }
  }
}
