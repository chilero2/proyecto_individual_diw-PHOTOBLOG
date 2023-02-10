import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyProfilePageRoutingModule } from './my-profile-routing.module';

import { MyProfilePage } from './my-profile.page';
import { MyComponentsModule } from '../../my-components/my-components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MyProfilePageRoutingModule,
    MyComponentsModule
  ],
  declarations: [MyProfilePage]
})
export class MyProfilePageModule { }
