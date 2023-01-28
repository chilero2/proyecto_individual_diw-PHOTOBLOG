import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, Users } from './interfaces/users';
import { AlertController } from '@ionic/angular';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  url = 'localhost:3000'


  constructor(public http: HttpClient, private route: Router, private alertController: AlertController) { }

  auth(user: User): any {
    this.http.get<User[]>(`http://localhost:3000/users?email=${user.email}`)
      .subscribe((data: User[]) => {
        try {
          if (data[0].email === user.email && data[0].password === user.password) {
            localStorage.setItem('usuario', JSON.stringify(data[0]))
            return this.route.navigate(['home-user'])
          }
          return this.presentAlert('Usuario o constraseña no valido')
        } catch (error) {
          return this.presentAlert('Usuario o constraseña no valido')
        }

      })
  }

  addUser(user: User): any {
    this.http.post<User>(`http://localhost:3000/users`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    })
      .subscribe(res => {
        if (res) {

          localStorage.setItem('usuario', JSON.stringify(res))
          return this.route.navigate(['home-user'])
        }
        return this.presentAlert('Error')
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
