import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { PostServiceService } from '../../post-service.service';
import { Router } from '@angular/router';
import { CameraServicesService } from '../../camera-services.service';
import { Image } from 'src/app/interfaces/images';
import { Filesystem, Directory, FileInfo } from '@capacitor/filesystem';
import { readFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Photo } from '@capacitor/camera';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
  @Input() title: string;
  result: string;
  images: Image[] = [];
  image: Image | undefined

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private postService: PostServiceService,
    private route: Router,
    private cameraService: CameraServicesService,
    private loadingCtrl: LoadingController
  ) {
    this.title = '';
    this.result = '';
  }
  async ngOnInit() {
    await this.loadFiles();
    this.image = await this.showImage()
  }

  async loadFiles() {
    this.images = [];
    const loading = await this.loadingCtrl.create({
      message: 'Loading Data...',
    });
    await loading.present();
    Filesystem.readdir({
      directory: Directory.Data,
      path: this.cameraService.PHOTO_STORAGE,
    })
      .then(
        (res) => {
          this.loadingFileData(res.files);
          this.image = this.showImage()
          
          

        },
        async (err) => {
          await Filesystem.mkdir({
            directory: Directory.Data,
            path: this.cameraService.PHOTO_STORAGE,
          });
        }
      )
      .then(() => {
        loading.dismiss();
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
          text: 'Album',
          data: {
            action: 'share',
          },
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

 showImage() {
    for(const image of this.images) {
      if(image.user_id ===  this.postService.getToken())
        return image
    }
    return 
  }



  camera() {
    this.cameraService.addNewToGallery().then((res) => {
      this.savePicture(res);
    });
  }

  async savePicture(cameraPhoto: Photo) {
    //Convertir la foto a formato base64
    const base64Data = await this.cameraService.readAsBase64(cameraPhoto);

    //Escribir la foto en el directorio
    const fileName = new Date().getTime() + '.jpg';
    console.log(`${this.cameraService.PHOTO_STORAGE}/${fileName}`);
    const img = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${this.cameraService.PHOTO_STORAGE}/${fileName}`,
      data: base64Data,
    });
    this.loadFiles();
  }
}
