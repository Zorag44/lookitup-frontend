import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login-sheet',
  templateUrl:'./login-sheet.component.html',
  styles: [
    `.px-5 {
      padding-left: 10rem;
      padding-right: 1.25rem;
  }`
  ]
})
export class LoginSheetComponent {
  constructor(private router:Router,private dataService:DataService, private http:HttpClient, private authService:AuthService){

  }
  httpOptions={
    headers: new HttpHeaders({
      'content-Type':'application/json'
    })
  };
  url:String='http://localhost:3000';
  name:String="";
  password:String="";
  valid():void{
    if(this.name!="" && this.password!=""){
      const user={
        name:this.name,
        password:this.password
      };

      this.authService.login(user).subscribe(
        ()=>{
          console.log(user.name);
          this.sendData();
          this.router.navigate(['/profile']);
        },
        (error:HttpErrorResponse)=>{
          console.log("error");
          alert('invalid credentials!');
        }
      );
    }
    else{
      alert("Enter valid credentials!!");
    }
  }
  sendData() {
    const data = {name: this.name, password: this.password }; 
    console.log(data.name + ' '+ data.password);
    this.dataService.sendData(data);
  }
}
