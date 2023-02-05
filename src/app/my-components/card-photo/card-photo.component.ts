import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/interfaces/images';
import { PostServiceService } from 'src/app/post-service.service';
import { DateTime } from "luxon";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-card-photo',
  templateUrl: './card-photo.component.html',
  styleUrls: ['./card-photo.component.scss'],
})
export class CardPhotoComponent implements OnInit {

  image!: Image
  urlImage: string = ''
  constructor(private activeRoute: ActivatedRoute, private navCtrl: NavController, private postService: PostServiceService) {

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

  back() {
    this.navCtrl.navigateBack('/home-user', { replaceUrl: true })

  }

  loadImage() {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    if (id) {
      this.postService.getImagePerId(id).subscribe(res => {
        this.image = res
      }
      )
    }

  }

  linkImg(): string {
    return 'assets/images/' + this.image?.url
  }

  nameImg(): string {
    return this.image?.name
  }

  commentImg(): string {
    return this.image?.comment
  }

  convertDate() {
    return DateTime.fromISO(this.image?.date).toFormat('LLLL d yyyy')
  }



}
