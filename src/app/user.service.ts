import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http'
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }
  httpOptions={
    headers: new HttpHeaders({
      'content-Type':'application/json'
    })
  };
  url:String='http://localhost:3000';
  
  getUser(user:any){
    return this.http.post<any>(this.url+'/api/user',user,this.httpOptions).pipe(
      tap(
        response=>{
          console.log(response);
        },
        (error:HttpErrorResponse)=>{
          
        }
      )
    );
  }
  getUsers(loc:any){
    return this.http.post<any>(this.url+'/api/users',loc,this.httpOptions).pipe(
      tap(
        response=>{
          // console.log(response);
        },
        (error:HttpErrorResponse)=>{
          
        }
      )
    );
  }
}
