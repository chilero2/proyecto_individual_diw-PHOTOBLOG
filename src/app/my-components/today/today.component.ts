import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PostServiceService } from '../../post-service.service';
import { Router } from '@angular/router';
import { CameraServicesService } from '../../camera-services.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
  @Input() title: string
  result: string

  constructor(private actionSheetCtrl: ActionSheetController,
    private postService: PostServiceService,
    private route: Router,
    private cameraService: CameraServicesService) {
    this.title = ''
    this.result = ''
  }
  async ngOnInit() {
    await this.cameraService.loadSave()

  }

  getImage() {
    // this.cameraService.loadSave()

  }




  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'How do you want to get the picture?',
      cssClass: 'sheet',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.camera()
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

    // const result = await actionSheet.onDidDismiss();
    // this.result = JSON.stringify(result, null, 2);
  }

  camera() {
    this.cameraService.addNewToGallery(this.postService.getToken())
  }








}
