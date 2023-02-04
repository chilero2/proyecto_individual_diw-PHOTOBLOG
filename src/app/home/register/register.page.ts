import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormsModule, AbstractControl } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { randomBytes, randomInt } from 'crypto';
import { User } from 'src/app/interfaces/users';
import { PostServiceService } from 'src/app/post-service.service';
import { HomeUserPageRoutingModule } from '../../home-user/home-user-routing.module';
import { v4 as uuidv4 } from 'uuid'
import { group } from 'console';
import { Router } from '@angular/router';
import { Users } from '../../interfaces/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formRegister!: FormGroup

  constructor(public formBuilder: FormBuilder,
    private alertController: AlertController,
    private postServices: PostServiceService,
    private router: Router,
    public navCtr: NavController) {


  }

  ngOnInit() {
    this.formRegister = this.buildForm()
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      'username': new FormControl("", Validators.compose([Validators.required, Validators.maxLength(25)])),
      'email': new FormControl("", Validators.compose([Validators.required, Validators.email])),
      'password': new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])),
      'passwordConfirm': new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)]))
    }, {
      validators: this.ValidarContrasena('password', 'passwordConfirm')
    })
  }

  ValidarContrasena(pass: string, passRepeat: string) {
    return (group: AbstractControl) => {
      const control = group.get(pass);
      const matchingControl = group.get(passRepeat);

      if (!control || !matchingControl) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    }
  }



  async register() {
    if (this.formRegister.invalid) {
      return this.presentAlert()
    }
    const id: string = uuidv4()
    const data = this.formRegister.value

    const user: User = {
      id: id,
      userName: data.username,
      email: data.email,
      password: data.password,
      imgProfile: ''
    }
    this.postServices.addUser(user)
      .subscribe(data => {
        if (data) {
          localStorage.setItem('usuario', JSON.stringify(data))
          this.postServices.setToken(data.id)
          return this.navCtr.navigateRoot('home-user')
        }
        return this.presentAlert()
      })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'You have incorrect fields ',
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
