import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { User } from '../../interfaces/users';
import { PostServiceService } from '../../post-service.service';
import { CameraServicesService } from '../../camera-services.service';
import { Image } from '../../interfaces/images';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  user!: User | undefined
  form: boolean = false
  formUser!: FormGroup

  constructor(public formBuilder: FormBuilder,
    private alertController: AlertController,
    public postService: PostServiceService,
    private route: Router,
    public navCtr: NavController,
    private cameraServices: CameraServicesService) { }

  ngOnInit() {
    this.postService.getUser(this.postService.getToken()).subscribe(data => {
      this.user = data
    })
    this.formUser = this.buildForm()
  }

  showForm() {
    this.formUser.reset()
    this.postService.getUser(this.postService.getToken()).subscribe(data => {
      this.user = data
    })
    this.formUser = this.buildForm()
    this.form = !this.form
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      'username': new FormControl('', Validators.compose([Validators.minLength(1), Validators.maxLength(25)])),
      'email': new FormControl('', Validators.compose([Validators.minLength(1), Validators.email])),
      'password': new FormControl('', Validators.compose([Validators.minLength(1), Validators.minLength(4), Validators.maxLength(10)])),
      'password2': new FormControl('', Validators.compose([Validators.minLength(1), Validators.minLength(4), Validators.maxLength(10)]))
    }, {
      validators: this.ValidarContrasena('password', 'password2')
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

  async saveUser() {
    if (this.formUser.invalid) {
      return await this.presentAlert('You must complete all fields')
    }
    const data = this.formUser.value
    const user: User = {
      id: this.user!.id,
      username: data.username === '' ? this.user?.username : data.username,
      email: data.email === '' ? this.user?.email : data.email,
      password: data.password === '' ? this.user?.password : data.password,
      imgProfile: this.user?.imgProfile
    }
    await this.postService.updateUser(user).subscribe(() => {
      return this.showForm()
    })
  }


  async updatePhoto() {
    await this.cameraServices.addNewToGallery().then((res) => {
      const base64Data = this.cameraServices.readAsBase64(res)
      base64Data.then(data => {
        const id = this.postService.getToken()
        this.postService.saveImageProfile(data, id).subscribe(() => {
          return this.showForm()
        })
      })
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


// const picture: Image = {
//   id: uuidv4(),
//   comment: '',
//   name: `_profile${new Date().getTime()}.jpg`,
//   date: DateTime.now().toLocaleString(),
//   url: data,
//   user_id: this.postService.getToken()
// }