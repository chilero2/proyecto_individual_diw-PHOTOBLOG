import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces/users';
import { PostServiceService } from 'src/app/post-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input() header: boolean

  formLogin: FormGroup

  constructor(public fb: FormBuilder,
    private alertController: AlertController,
    public postServices: PostServiceService,
    private route: Router,
    public navCtr: NavController) {
    this.header = false
    this.formLogin = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  async login() {
    if (this.formLogin.invalid) {
      return this.presentAlert('You must complete all fields')
    }
    const data = this.formLogin.value
    const user: User = {
      id: '',
      username: '',
      email: data.email,
      password: data.password,
      imgProfile: ''
    }

    this.postServices.auth(user)
      .subscribe((data: User[]) => {
        try {
          if (data[0].email === user.email && data[0].password === user.password) {
            localStorage.setItem('usuario', JSON.stringify(data[0]))
            this.postServices.setToken(data[0].id)
            return this.navCtr.navigateRoot('home-user')
          }
          return this.presentAlert('Usuario o constraseña no valido')
        } catch (error) {
          return this.presentAlert('Usuario o constraseña no valido')
        }
      })
  }



  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
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
