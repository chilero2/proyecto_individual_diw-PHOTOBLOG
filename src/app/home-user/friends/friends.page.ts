import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { User } from 'src/app/interfaces/users';
import { PostServiceService } from 'src/app/post-service.service';
import { Users } from '../../interfaces/users';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {


  query: string = ''
  friends: User[] = []
  selectFriend?: User 
  constructor( private loadingCtrl: LoadingController, private postservice: PostServiceService) { }

  async ngOnInit() {
    await this.postservice.searchFriends(this.query).subscribe(res => {
      this.friends = res
    })    
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
        this.friends = res
      })
      loading.present();
    })
  }

  showFriend(event: Event) {
    const e = (event.target as HTMLImageElement).dataset['id']
    this.postservice.getUser(e!).subscribe(data => {
      this.selectFriend = data
    })    
  }

}
