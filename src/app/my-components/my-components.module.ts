import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { IonicModule } from '@ionic/angular';
import { LogoComponent } from './logo/logo.component';




@NgModule({
  declarations: [ButtonComponent, LogoComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ButtonComponent, LogoComponent]
})
export class MyComponentsModule { }
