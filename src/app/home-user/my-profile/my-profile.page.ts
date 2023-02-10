import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { User } from '../../interfaces/users';
import { PostServiceService } from '../../post-service.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  user!: User | undefined
  form: boolean = false
  formUser: FormGroup

  constructor(public fb: FormBuilder,
    private alertController: AlertController,
    public postService: PostServiceService,
    private route: Router,
    public navCtr: NavController) {
      this.formUser = this.fb.group({

      })
     }

  ngOnInit() {
    this.postService.getUser(this.postService.getToken()).subscribe(data => {
      this.user = data
    })
  }

  showForm() {
    this.form = !this.form
    console.log(this.form)

  }

  saveUser() {

  }

}
