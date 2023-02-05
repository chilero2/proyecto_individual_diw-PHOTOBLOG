import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoLoginGuard } from '../no-login.guard';

import { HomeUserPage } from './home-user.page';

const routes: Routes = [
  {
    path: '',
    component: HomeUserPage,
    canActivate: [NoLoginGuard]
  },
  {
    path: ':id',
    loadChildren: () => import('./view-image/view-image.module').then(m => m.ViewImagePageModule),
    canActivate: [NoLoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeUserPageRoutingModule { }
