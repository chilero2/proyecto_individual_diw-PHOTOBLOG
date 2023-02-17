import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { DateTime } from 'luxon';

import { Image } from 'src/app/interfaces/images';
import { User } from 'src/app/interfaces/users';
import { PostServiceService } from 'src/app/post-service.service';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  onlyFriend: boolean = false
  query: string = ''
  friends: User[] = []
  selectFriend?: User
  imagesFriend: Image[] = []
  constructor(private loadingCtrl: LoadingController,
    private postservice: PostServiceService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  async ngOnInit() {

    if (this.activeRoute.snapshot.paramMap.has('id')) {
      this.onlyFriend = true
      const id = this.activeRoute.snapshot.paramMap.get('id')
      await this.postservice.getUser(id!).subscribe(data => {
        this.selectFriend = data
        this.postservice.getAllImages(id!).subscribe(data => {
          this.imagesFriend = data
        })
      })
    }

    await this.postservice.searchFriends(this.query).subscribe(res => {
      this.friends = res
    })
  }

  moreFriend() {
    this.onlyFriend = true
    this.router.navigateByUrl('/home-user/friends')
  }


  async handleChange(event: any) {
    this.query = event.detail.value
    await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 3000,
      spinner: 'circles',
      cssClass: 'custom-loading',
    }).then((loading) => {
      this.postservice.searchFriends(this.query).subscribe(res => {
        this.selectFriend = undefined
        this.imagesFriend = []
        this.friends = res
      })
      loading.present();
    })
  }

  async showFriend(event: Event) {
    const e = (event.target as HTMLImageElement).dataset['id']
    await this.postservice.getUser(e!).subscribe(data => {
      this.selectFriend = data
      this.postservice.getAllImages(e!).subscribe(data => {
        this.imagesFriend = data
      })
    })
  }

  convertDate(image: Image) {
    return DateTime.fromISO(image.date).toFormat('LLLL d yyyy')
  }
  linkImg(image: Image): string {
    if (!image.url.includes('base64')) return 'assets/images/' + image?.url
    return image?.url
  }

}
