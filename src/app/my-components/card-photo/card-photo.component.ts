import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/interfaces/images';
import { PostServiceService } from 'src/app/post-service.service';
import { DateTime } from "luxon";
import { AlertController, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-card-photo',
  templateUrl: './card-photo.component.html',
  styleUrls: ['./card-photo.component.scss'],
})
export class CardPhotoComponent implements OnInit {

  showForm: boolean = false
  image!: Image
  urlImage: string = ''
  formComment!: FormGroup
  constructor(private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private postService: PostServiceService,
    public formBuilder: FormBuilder,
    private alertController: AlertController) {

  }

  async ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    if (id) {
      await this.postService.getImagePerId(id).subscribe(res => {
        this.image = res
        this.showForm = this.image.comment === ''
      }
      )
    }

    this.formComment = this.buildForm()
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      'comment': new FormControl("", Validators.compose([Validators.required]))
    })
  }

  async addComment() {
    if (this.formComment.invalid) {
      return this.presentAlert()
    }

    const comment: string = this.formComment.value.comment
    this.postService.addComment(this.image.id, comment).subscribe()
    this.back()
  }


  back() {
    this.navCtrl.navigateBack('/home-user', { replaceUrl: true })

  }

  loadImage() {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    if (id) {
      this.postService.getImagePerId(id).subscribe(res => {
        this.image = res
      }
      )
    }

  }

  linkImg(): string {
    if (!this.image.url.includes('base64')) return 'assets/images/' + this.image?.url
    return this.image?.url
  }

  nameImg(): string {
    return this.image?.name
  }

  commentImg(): string {
    return this.image?.comment
  }

  convertDate() {
    return DateTime.fromISO(this.image?.date).toFormat('LLLL d yyyy')
  }

  isToday() {
    return this.image?.date === DateTime.now().toFormat('yyyy-LL-dd')
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'You have to write a comment ',
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
