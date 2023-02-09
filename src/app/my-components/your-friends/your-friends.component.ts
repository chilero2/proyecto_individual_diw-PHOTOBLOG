import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../../post-service.service';
import { User } from '../../interfaces/users';

@Component({
  selector: 'app-your-friends',
  templateUrl: './your-friends.component.html',
  styleUrls: ['./your-friends.component.scss'],
})
export class YourFriendsComponent implements OnInit {

  friends:User[] = []

  constructor(private postService: PostServiceService) { }



  

  ngOnInit() {
    this.postService.getFriends(this.postService.getToken()).subscribe((data: User[]) => {
      this.friends = data
    })
  }

}
