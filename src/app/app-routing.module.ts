import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/helpers/auth.gaurd';
import { Role } from 'src/shared/models/role';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'role',
    loadChildren: () => import('./pages/role/role.module').then(m => m.RolePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'devices',
    loadChildren: () => import('./pages/devices/devices.module').then(m => m.DevicesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-device',
    loadChildren: () => import('./pages/add-device/add-device.module').then(m => m.AddDevicePageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'device',
    loadChildren: () => import('./pages/device/device.module').then(m => m.DevicePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'add-user',
    loadChildren: () => import('./pages/add-user/add-user.module').then(m => m.AddUserPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
