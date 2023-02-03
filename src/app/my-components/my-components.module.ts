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
import { RouterModule } from '@angular/router';
import { CardPhotoComponent } from './card-photo/card-photo.component';
import { DateTime } from "luxon";




@NgModule({
  declarations: [ButtonComponent, LogoComponent, TitleComponent, InputComponent, NavComponent, FooterComponent, TodayComponent, LastDaysComponent, YourFriendsComponent, CardPhotoComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  
    
    
  ],
  exports: [ButtonComponent, LogoComponent, TitleComponent, InputComponent, NavComponent, FooterComponent, TodayComponent, LastDaysComponent, YourFriendsComponent, CardPhotoComponent]
})
export class MyComponentsModule { }
