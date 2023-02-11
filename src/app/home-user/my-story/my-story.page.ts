import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/interfaces/images';
import { PostServiceService } from 'src/app/post-service.service';

@Component({
  selector: 'app-my-story',
  templateUrl: './my-story.page.html',
  styleUrls: ['./my-story.page.scss'],
})
export class MyStoryPage implements OnInit {

  images: Image[] = []

  constructor(private postService: PostServiceService) { }

  async ngOnInit() {
    await this.postService.getImage(this.postService.getToken()).subscribe(data => {
      this.images = data
    })
  }

}
