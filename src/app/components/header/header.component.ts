import { Component } from '@angular/core';
import { MatBottomSheet,MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { RegisterSheetComponent } from '../register-sheet/register-sheet.component';
import { LoginSheetComponent } from '../login-sheet/login-sheet.component';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  
})
export class HeaderComponent {
  constructor(private bottomsheet:MatBottomSheet, private authService:AuthService, private router:Router){

  }
  openSheet(){
    this.bottomsheet.open(RegisterSheetComponent);
  }
  openLoginSheet(){
    this.bottomsheet.open(LoginSheetComponent);
  }
  isLoggedIn():boolean{
    return this.authService.isLoggedIn();
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
