import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private route: Router, private postService: PostServiceService) { }

  login() {
    this.postService.deleteToken()
    this.route.navigate(['/login'])
  }

  register() {
    this.postService.deleteToken()
    this.route.navigate(['/register'])
  }
}
