import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { Image } from 'src/app/interfaces/images';
import { PostServiceService } from 'src/app/post-service.service';

@Component({
  selector: 'app-my-story',
  templateUrl: './my-story.page.html',
  styleUrls: ['./my-story.page.scss'],
})
export class MyStoryPage implements OnInit {

  images: Image[] = []
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  years: string[] = []

  constructor(private postService: PostServiceService) { }

  async ngOnInit() {
    await this.postService.getImage(this.postService.getToken()).subscribe(data => {
      this.images = data
      this.images.forEach(image => {
        const year = image.date.split('-')
        if (!this.years.includes(year[0])) this.years.push(year[0])
      })
      this.years.sort((a, b) => Number(a) - Number(b))
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
