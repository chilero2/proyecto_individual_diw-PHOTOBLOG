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
import { LastDaysComponent } from './last-days/last-days.component';
import { YourFriendsComponent } from './your-friends/your-friends.component';




@NgModule({
  declarations: [ButtonComponent, LogoComponent, TitleComponent, InputComponent, NavComponent, FooterComponent, TodayComponent, LastDaysComponent, YourFriendsComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ButtonComponent, LogoComponent, TitleComponent, InputComponent, NavComponent, FooterComponent, TodayComponent, LastDaysComponent, YourFriendsComponent]
})
export class MyComponentsModule { }
