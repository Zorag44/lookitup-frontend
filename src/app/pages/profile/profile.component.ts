import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/user.model';
import { UserService } from 'src/app/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
let curUserr=localStorage.getItem('user');

let curUser: {
  password: String;
  loc: String;
  gstin: String;
  phone: Number;
  name: String; 
  id:String;
};
if(curUserr){
  curUser=JSON.parse(curUserr);
}
@Component({
  selector: 'app-profile',
  templateUrl:'./profile.component.html',
  styles: [
  ]
})

export class ProfileComponent implements OnInit {
  constructor(private dataService: DataService, 
    private authService:AuthService,
     private userService:UserService, 
     private http:HttpClient,
     private router:Router) {
     
  }
  receivedData: any;
  httpOptions={
    headers: new HttpHeaders({
      'content-Type':'application/json'
    })
  };
  user:User={
    name:curUser.name,
    phone:curUser.phone,
    gstin:curUser.gstin,
    loc:curUser.loc,
    password:curUser.password,
    id:curUser.id
  };
  
  ngOnInit() {

    curUserr=localStorage.getItem('user');
    if(curUserr){
      curUser=JSON.parse(curUserr);
    }
    this.user=curUser
    console.log(curUser);
    //  this.dataService.data$.subscribe(
    //   data => {
    //   this.receivedData = data;
    //   // const curUser=this.userService.getUser(this.receivedData).subscribe(
    //   //   (response)=>{
    //   //     this.user=response;
    //   //     this.receivedData=this.user;
    //   //     alert(this.user.password);
    //   //     console.log(this.receivedData);
    //   //   }
    //   // )
    // });
  }
  url:String='http://localhost:3000';
  ok(){
    console.log(curUser);
    
    if(this.user.name.length!=0 && this.user.phone.toString().length==10&&this.user.gstin.length>0&&this.user.loc.length>0&&this.user.password.length>0){
      this.http.post(this.url+'/api/updateUser',this.user,this.httpOptions).subscribe(
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
    alert('updated');
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
