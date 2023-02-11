import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStoryPageRoutingModule } from './my-story-routing.module';

import { MyStoryPage } from './my-story.page';
import { MyComponentsModule } from '../../my-components/my-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStoryPageRoutingModule,
    MyComponentsModule
  ],
  declarations: [MyStoryPage]
})
export class MyStoryPageModule { }
