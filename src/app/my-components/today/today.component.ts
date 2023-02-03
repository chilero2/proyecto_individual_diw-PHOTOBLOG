import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
  @Input() title: string

  constructor(private actionSheetCtrl: ActionSheetController) {
    this.title = ''
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'How do you want to get the picture?',
      cssClass: 'sheet',
      buttons: [
        {
          text: 'Camera',
          data: {
            action: 'delete',
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

    const result = await actionSheet.onDidDismiss();
    // this.result = JSON.stringify(result, null, 2);
  }
  

  ngOnInit() { }

}
