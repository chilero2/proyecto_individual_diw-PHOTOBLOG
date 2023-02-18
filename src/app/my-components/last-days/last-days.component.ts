import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/interfaces/images';
import { PostServiceService } from '../../post-service.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-last-days',
  templateUrl: './last-days.component.html',
  styleUrls: ['./last-days.component.scss'],
})
export class LastDaysComponent implements OnInit {

  user!: string
  images: Image[]
  constructor(public postServiceService: PostServiceService, private navCtrl: NavController) {
    this.images = []
  }

  ngOnInit() {
    this.user = this.postServiceService.getToken()
    this.postServiceService.getImageLastDays(this.user).subscribe(data => {
      this.images = data
    })
  }

  goPhoto(id: string) {
    const url = `/home-user/image/${id}`
    this.navCtrl.navigateForward(url, { replaceUrl: true })
  }

  getUrl(url: string) {
    if (url.includes('.jpg')) return `./assets/images/${url}`
    return url
  }










}
