import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../../post-service.service';
import { User } from '../../interfaces/users';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { IonicSlides } from '@ionic/angular';

SwiperCore.use([IonicSlides])

@Component({
  selector: 'app-your-friends',
  templateUrl: './your-friends.component.html',
  styleUrls: ['./your-friends.component.scss'],
})
export class YourFriendsComponent implements OnInit {

  friends: User[] = []

  slideOpts = {
    slidesPerView: 3,


  }

  constructor(private postService: PostServiceService) { }





  ngOnInit() {
    this.postService.getFriends(this.postService.getToken()).subscribe((data: User[]) => {
      this.friends = data
    })
  }

}
