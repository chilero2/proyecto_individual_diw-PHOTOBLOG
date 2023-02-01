import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, Users } from './interfaces/users';
import { AlertController } from '@ionic/angular';
import { catchError, map } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { Image } from './interfaces/images';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  url = 'http://localhost:3000/'


  constructor(private cookies: CookieService, public http: HttpClient, private route: Router, private alertController: AlertController) { }

  auth(user: User): any {
    this.http.get<User[]>(`${this.url}users?email=${user.email}`)
      .subscribe((data: User[]) => {
        try {
          if (data[0].email === user.email && data[0].password === user.password) {
            localStorage.setItem('usuario', JSON.stringify(data[0]))
            this.setToken(data[0].id)
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
      .subscribe(data => {
        if (data) {

          localStorage.setItem('usuario', JSON.stringify(data))
          this.setToken(data.id)
          return this.route.navigate(['home-user'])
        }
        return this.presentAlert('Error')
      })
  }

  getImage(idUser: string) {
    return this.http.get<Image[]>(`${this.url}images?user_id=${idUser}`)
      .pipe(map((res: Image[]) => res))
  }

  getImagePerId(idImage: string) {
    return this.http.get<Image[]>(`${this.url}images?id=${idImage}`)
      .pipe(map((res) => res[0]))
  }


  setToken(token: string) {
    this.cookies.set('token', token)
  }

  getToken() {
    return this.cookies.get("token");
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
