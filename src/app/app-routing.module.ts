import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DevicesComponent } from './devices/devices.component';
import { UsersComponent } from './users/users.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'devices',
    component: DevicesComponent,

  },
  {
    path: 'users',
    component: UsersComponent,

  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
    //canActivate: [AuthGuard]
  },
  {
    path: '**', component: PageNotFoundComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
