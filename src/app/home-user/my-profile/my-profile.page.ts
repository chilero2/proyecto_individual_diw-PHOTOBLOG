import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms'
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
  formUser!: FormGroup

  constructor(public formBuilder: FormBuilder,
    private alertController: AlertController,
    public postService: PostServiceService,
    private route: Router,
    public navCtr: NavController) { }

  ngOnInit() {    
    this.postService.getUser(this.postService.getToken()).subscribe(data => {
      this.user = data
    })
    this.formUser = this.buildForm()
  }

  showForm() {
    this.form = !this.form
    this.postService.getUser(this.postService.getToken()).subscribe(data => {
      this.user = data
    })
    // TODO resetar formulario

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

  saveUser() {
    if(this.formUser.invalid) {
      return this.presentAlert('You must complete all fields')
    }
    const data = this.formUser.value
    const user : User = {
      id: this.user!.id,
      username: data.username === '' ? this.user?.username : data.username,
      email: data.email === '' ? this.user?.email : data.email,
      password: data.password === '' ? this.user?.password : data.password,
      imgProfile: this.user?.imgProfile
    }
    this.postService.updateUser(user).subscribe() 
    return this.showForm()
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
