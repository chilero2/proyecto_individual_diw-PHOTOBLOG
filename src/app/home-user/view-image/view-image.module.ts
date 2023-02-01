import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewImagePageRoutingModule } from './view-image-routing.module';

import { ViewImagePage } from './view-image.page';
import { MyComponentsModule } from '../../my-components/my-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewImagePageRoutingModule,
    MyComponentsModule
  ],
  declarations: [ViewImagePage]
})
export class ViewImagePageModule { }
