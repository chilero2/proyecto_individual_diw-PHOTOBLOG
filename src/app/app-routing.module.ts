import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ViewImagePageModule } from './home-user/view-image/view-image.module';
import { LoginGuard } from './login.guard';
import { NoLoginGuard } from './no-login.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./home/login/login.module').then(m => m.LoginPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./home/register/register.module').then(m => m.RegisterPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'home-user',
    loadChildren: () => import('./home-user/home-user.module').then(m => m.HomeUserPageModule),
    canActivate: [NoLoginGuard]
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
