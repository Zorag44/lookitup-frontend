import { Injectable,OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class profileGuard implements OnInit,CanActivate {
  receivedData:any;
  constructor(private router: Router, private dataService: DataService, private authService:AuthService) { }
  ngOnInit=()=> {
    this.dataService.data$.subscribe(data => {
      this.receivedData = data;
      console.log(this.receivedData['name']);
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.ngOnInit();
    if (this.authService.isLoggedIn()) {
      return true; 
    } else {
      alert('not authenticated!')
      this.router.navigate(['/home']);
      return false;
    }
  }
}
