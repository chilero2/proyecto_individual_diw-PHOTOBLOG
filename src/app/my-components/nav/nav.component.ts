import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostServiceService } from '../../post-service.service';
import { NavController } from '@ionic/angular';
import { HomePage } from '../../home/home.page';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  constructor(private postService: PostServiceService, private navCntl: NavController) { }

  ngOnInit() { }

  logOut() {
    this.postService.deleteToken()
    this.navCntl.navigateRoot('')
  }
  goHome() {
    this.navCntl.navigateRoot('home-user')
  }

  goProfile() {
    this.navCntl.navigateForward('home-user/my-profile')
  }
  goStory() {
    this.navCntl.navigateForward('home-user/my-story')
  }
  goFriends() {
    this.navCntl.navigateForward('home-user/friends')
  }



}
