import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeUserPage } from './home-user.page';

const routes: Routes = [
  {
    path: '',
    component: HomeUserPage
  },
  {
    path: ':id',
    loadChildren: () => import('./view-image/view-image.module').then(m => m.ViewImagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeUserPageRoutingModule { }
