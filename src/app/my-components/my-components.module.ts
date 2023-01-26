import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { IonicModule } from '@ionic/angular';
import { LogoComponent } from './logo/logo.component';
import { TitleComponent } from './title/title.component';
import { InputComponent } from './input/input.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { TodayComponent } from './today/today.component';




@NgModule({
  declarations: [ButtonComponent, LogoComponent, TitleComponent, InputComponent, NavComponent, FooterComponent, TodayComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ButtonComponent, LogoComponent, TitleComponent, InputComponent, NavComponent, FooterComponent, TodayComponent]
})
export class MyComponentsModule { }
