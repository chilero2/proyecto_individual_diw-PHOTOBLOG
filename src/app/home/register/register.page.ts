import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { randomBytes, randomInt } from 'crypto';
import { User } from 'src/app/interfaces/users';
import { PostServiceService } from 'src/app/post-service.service';
import { HomeUserPageRoutingModule } from '../../home-user/home-user-routing.module';
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formRegister: FormGroup

  constructor(public fb: FormBuilder, private alertController: AlertController, private postServices: PostServiceService) {
    this.formRegister = this.fb.group({
      'username': new FormControl("", Validators.required),
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'passwordConfirm': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {

  }

  register() {
    if (this.formRegister.invalid) {
      this.presentAlert()
    }
    const data = this.formRegister.value
    const id: string = uuidv4()

    const user: User = {
      id: id,
      userName: data.username,
      email: data.email,
      password: data.password,
      imgProfile: ''
    }

    this.postServices.addUser(user)




  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'You must complete all fields',
      cssClass: 'custom-alert',
      buttons: [{
        text: 'Accept',
        cssClass: 'alert-button-accept'
      }],
    });

    await alert.present();
    return
  }

}
