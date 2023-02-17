import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { DateTime } from 'luxon';
import { GifsServiceService } from 'src/app/gifs-service.service';
import { Gif } from 'src/app/interfaces/gifs';
import { Image } from 'src/app/interfaces/images';
import { PostServiceService } from '../../post-service.service';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.page.html',
  styleUrls: ['./gifs.page.scss'],
})
export class GifsPage implements OnInit {

  texto: string = ''
  gifs: Gif[] = []

  constructor(private gifServices: GifsServiceService,
    private loadingCtrl: LoadingController,
    private postservice: PostServiceService,
    private navCtrl: NavController,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  // EVENTS + REQUEST
  async handleChange(event: any) {
    this.texto = event.detail.value
    this.presentLoading('Loading...').then(() => {
      this.gifServices.buscarGifs(this.texto)?.subscribe(res => {
        this.loadingCtrl.dismiss()
        this.gifs = res.data
      })
    })
  }

  saveGif(gif: Gif) {
    this.presentLoading('Saving...').then(() => {
      const newImage: Image = {
        id: gif.id,
        name: `${gif.title}${new Date().getTime()}`,
        user_id: this.postservice.getToken(),
        url: gif.images.downsized_medium.url,
        date: DateTime.now().toFormat('yyyy-LL-dd'),
        comment: ''
      }
      this.postservice.getTodayPicture().subscribe(data => {
        data ? this.postservice.modifyPicture(newImage, data.id).subscribe((data) => {
          this.loadingCtrl.dismiss()
          this.navCtrl.navigateBack('/home-user')
        }) :
          this.postservice.addImage(newImage).subscribe((data) => {
            this.loadingCtrl.dismiss()
            this.navCtrl.navigateBack('/home-user')
          })
      })
    })

  }

  // ALERT
  async presentAlert(gif: Gif) {
    const alert = await this.alertController.create({
      header: 'This gif simplifies my day',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Nop',
          cssClass: 'alert-button-cancel',
          role: 'cancel'
        },
        {
          text: 'Sure',
          cssClass: 'alert-button-accept',
          handler: () => this.saveGif(gif)
        },
      ],
    });
    await alert.present();
  }

  // LOADING
  async presentLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message,
      spinner: 'circles',
      cssClass: 'custom-loading',
    })
    return await loading.present();
  }

}


