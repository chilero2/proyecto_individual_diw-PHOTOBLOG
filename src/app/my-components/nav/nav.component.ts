import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostServiceService } from '../../post-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  constructor(private postService: PostServiceService, private route: Router) { }

  ngOnInit() { }

  logOut() {
    this.postService.deleteToken()

    this.route.navigate([''])
  }

}
