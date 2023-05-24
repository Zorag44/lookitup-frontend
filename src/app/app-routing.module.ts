import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/search/components/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { profileGuard } from './profile.guard';

const routes: Routes = [
  {
    path:'',
    component:SearchComponent
  },
  {
    path:'home',redirectTo:'',pathMatch:'full'
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[profileGuard]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[profileGuard]
})
export class AppRoutingModule { }
