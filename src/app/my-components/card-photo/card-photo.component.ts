import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/interfaces/images';
import { PostServiceService } from 'src/app/post-service.service';
import { DateTime } from "luxon";

@Component({
  selector: 'app-card-photo',
  templateUrl: './card-photo.component.html',
  styleUrls: ['./card-photo.component.scss'],
})
export class CardPhotoComponent implements OnInit {
  
  image!: Image
  constructor(private activeRoute: ActivatedRoute, private postService: PostServiceService) {
  
   }

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    if (id) {
      this.postService.getImagePerId(id).subscribe(res => {
        this.image = {... res}
      }
      )
    }
    
  }
  convertDate() {
    return DateTime.fromISO(this.image?.date).toFormat('LLLL d yyyy')
   }

 

}
