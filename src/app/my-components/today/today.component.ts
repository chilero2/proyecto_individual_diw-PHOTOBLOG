import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController, NavController } from '@ionic/angular';
import { PostServiceService } from '../../post-service.service';
import { Router } from '@angular/router';
import { CameraServicesService } from '../../camera-services.service';
import { Image } from 'src/app/interfaces/images';
import { Filesystem, Directory, FileInfo } from '@capacitor/filesystem';
import { readFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Photo } from '@capacitor/camera';
import { DateTime } from 'luxon';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
  @Input() title: string;
  result: string;
  todayImage: Image | undefined;
  images: Image[] = [];
  imagesUser: Image[] = [];
  commentToday!: string


  constructor(
    private actionSheetCtrl: ActionSheetController,
    private postService: PostServiceService,
    private cameraService: CameraServicesService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {
    this.title = '';
    this.result = '';

  }
  ngOnInit() {
    this.presentLoading('Loading...').then(() => {
      this.postService.getTodayPicture().subscribe(data => {
        this.loadingCtrl.dismiss()
        this.todayImage = data
        this.commentToday = data.comment
      })
    })
  }

  // PICTURES
  camera() {
    this.cameraService.addNewToGallery().then((res) => {
      const base64Data = this.cameraService.readAsBase64(res)
      base64Data.then(data => {
        const picture: Image = {
          id: uuidv4(),
          name: `${new Date().getTime()}.jpg`,
          user_id: this.postService.getToken(),
          date: DateTime.now().toFormat('yyyy-LL-dd'),
          url: data,
          comment: '',
        }
        this.postService.getTodayPicture().subscribe(data => {

          data ? this.postService.modifyPicture(picture, data.id).subscribe(data => {
            this.todayImage = data
          }) :
            this.postService.addImage(picture).subscribe(data => {
              this.todayImage = data
            })
        })
      })
    });
  }

  async loadingFileData(fileName: any[]) {
    for (const file of fileName) {
      const filePath = `${this.cameraService.PHOTO_STORAGE}/${file.name}`;
      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath,
      });
      this.images.push({
        id: uuidv4(),
        name: filePath,
        user_id: this.postService.getToken(),
        url: `data:image/jpg;base64,${readFile.data}` || '',
        date: new Date().toLocaleDateString('en-US'),
        comment: '',
      });
    }
  }

  // ROUTES
  goGifs() {
    this.navCtrl.navigateForward(`/home-user/gifs`, { replaceUrl: true })
  }

  showTodayImg() {
    const url = `/home-user/image/${this.todayImage?.id}`
    this.navCtrl.navigateForward(url, { replaceUrl: true })
  }

  // ACTION SHEET
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'How do you want to get the picture?',
      cssClass: 'sheet',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.camera();
          },
        },
        {
          text: 'Gifs',
          handler: () => {
            this.goGifs()
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
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
