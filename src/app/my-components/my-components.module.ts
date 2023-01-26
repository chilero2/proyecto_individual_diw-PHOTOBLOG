import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { IonicModule } from '@ionic/angular';
import { LogoComponent } from './logo/logo.component';
import { TitleComponent } from './title/title.component';
import { InputComponent } from './input/input.component';




@NgModule({
  declarations: [ButtonComponent, LogoComponent, TitleComponent, InputComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ButtonComponent, LogoComponent, TitleComponent, InputComponent]
})
export class MyComponentsModule { }
