import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoLoginGuard } from '../no-login.guard';

import { HomeUserPage } from './home-user.page';

const routes: Routes = [
  {
    path: '',
    component: HomeUserPage,
    // canActivate: [NoLoginGuard]
  },
  {
    path: 'image/:id',
    loadChildren: () => import('./view-image/view-image.module').then(m => m.ViewImagePageModule),
    // canActivate: [NoLoginGuard]
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfilePageModule)
  },
  {
    path: 'my-story',
    loadChildren: () => import('./my-story/my-story.module').then(m => m.MyStoryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeUserPageRoutingModule { }
