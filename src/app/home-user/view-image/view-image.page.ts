import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostServiceService } from 'src/app/post-service.service';
import { Image } from '../../interfaces/images';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.page.html',
  styleUrls: ['./view-image.page.scss'],
})
export class ViewImagePage implements OnInit {

  image!: any
  constructor(private activeRoute: ActivatedRoute, private postService: PostServiceService) {

  }


  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    if (id) {
      this.postService.getImagePerId(id).subscribe(res => {
        this.image = res
      }
      )
    }
  }

}
