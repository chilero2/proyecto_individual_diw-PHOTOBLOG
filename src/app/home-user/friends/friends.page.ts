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
  constructor(
    private loadingCtrl: LoadingController,
    private postservice: PostServiceService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    if (this.activeRoute.snapshot.paramMap.has('id')) {
      this.presentLoading().then(() => {
        this.onlyFriend = true
        const id = this.activeRoute.snapshot.paramMap.get('id')
        this.postservice.getUser(id!).subscribe(data => {
          this.selectFriend = data
          this.postservice.getAllImages(id!).subscribe(data => {
            this.loadingCtrl.dismiss()
            this.imagesFriend = data
          })
        })
      })
    } else {
      this.presentLoading().then(() => {
        this.postservice.searchFriends(this.query).subscribe(res => {
          this.loadingCtrl.dismiss()
          this.friends = res
        })
      })
    }
  }

  // ROUTER
  moreFriend() {
    this.onlyFriend = true
    this.router.navigateByUrl('/home-user/friends')
  }

  // EVENTS + REQUEST
  handleChange(event: Event) {
    this.query = (event.target as HTMLIonSearchbarElement).value?.trim()!
    this.presentLoading().then(() => {
      this.postservice.searchFriends(this.query).subscribe(
        res => {
          this.loadingCtrl.dismiss()
          this.selectFriend = undefined
          this.imagesFriend = []
          this.friends = res
        }
      )
    })
  }

  showFriend(event: Event) {
    this.presentLoading().then(() => {
      const e = (event.target as HTMLImageElement).dataset['id']
      this.postservice.getUser(e!).subscribe(data => {
        this.selectFriend = data
        this.postservice.getAllImages(e!).subscribe(data => {
          this.loadingCtrl.dismiss()
          this.imagesFriend = data
        })
      })
    })
  }

  // UTILS
  convertDate(image: Image) {
    return DateTime.fromISO(image.date).toFormat('LLLL d yyyy')
  }
  linkImg(image: Image): string {
    if (image.url.includes('.jpg')) return `./assets/images/${image.url}`
    return image.url
  }

  // LOADING
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circles',
      cssClass: 'custom-loading',
    })
    return await loading.present()
  }





}
