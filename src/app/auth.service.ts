import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http'
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  httpOptions={
    headers: new HttpHeaders({
      'content-Type':'application/json'
    })
  };
  url:String='http://localhost:3000';
  
  res:any;
  login(user:any){
    return this.http.post<any>(this.url+'/api/login',user,this.httpOptions).pipe(
      tap(
        response=>{
          // console.log(response);
          this.res=response;
          
          localStorage.setItem('currentUser',response.token);
          localStorage.setItem('user',JSON.stringify( response.user));
          // console.log(localStorage.getItem('user'));
          
        },
        (error:HttpErrorResponse)=>{
          
        }
      )
    );
  }

  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');
  }

  isLoggedIn():boolean{
    // console.log(localStorage.getItem('currentUser'));
    return !!localStorage.getItem('currentUser');
  }

}
