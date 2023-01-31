import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/interfaces/images';
import { PostServiceService } from '../../post-service.service';

@Component({
  selector: 'app-last-days',
  templateUrl: './last-days.component.html',
  styleUrls: ['./last-days.component.scss'],
})
export class LastDaysComponent implements OnInit {

  user!: string
  images: Image[]
  constructor(public postServiceService: PostServiceService) {
    this.images = []
  }

  ngOnInit() {
    this.user = this.postServiceService.getToken()
    this.postServiceService.getImage(this.user).subscribe(data => {
      this.images = data
    })
  }







}
