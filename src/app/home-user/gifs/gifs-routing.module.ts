import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GifsPage } from './gifs.page';

const routes: Routes = [
  {
    path: '',
    component: GifsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GifsPageRoutingModule {}
