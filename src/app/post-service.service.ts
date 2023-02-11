import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, Users } from './interfaces/users';
import { AlertController } from '@ionic/angular';
import { catchError, map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Image } from './interfaces/images';
import { HexBase64BinaryEncoding } from 'crypto';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  logged = false;

  url = 'http://192.168.8.101:3000/'
  // url = 'http://172.29.228.146:3000/'
  // url = 'http://localhost:3000/';

  constructor(
    private cookies: CookieService,
    public http: HttpClient,
    private route: Router,
    private alertController: AlertController
  ) { }

  // USERS
  auth(user: User): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}users?email=${user.email}`);
  }

  getUser(user_id: String): Observable<User> {
    return this.http.get<User[]>(`${this.url}users?id=${user_id}`)
      .pipe(map((res) => res[0]));
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}users`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}users/${user.id}`, user)
  }

  // IMAGES

  saveImageProfile(picture: string, id: string): Observable<string> {
    const body = {
      "imgProfile": picture
    }
    return this.http.patch<string>(`${this.url}users/${id}`,
      JSON.stringify(body), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    })
  }

  getImage(idUser: string) {
    return this.http
      .get<Image[]>(`${this.url}images?user_id=${idUser}`)
      .pipe(map((res: Image[]) => res));
  }

  getImagePerId(idImage: string) {
    return this.http
      .get<Image[]>(`${this.url}images?id=${idImage}`)
      .pipe(map((res) => res[0]));
  }

  getImageLastDays(idUser: string) {
    const today = DateTime.now().toFormat('yyyy-LL-dd')
    return this.http
      .get<Image[]>(`${this.url}images?user_id=${idUser}&date_ne=${today}`)
      .pipe(map((res: Image[]) => res));
  }

  addImage(picture: Image): Observable<Image> {
    return this.http.post<Image>(`${this.url}images`, picture, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    })
  }

  modifyPicture(picture: Image, id: string): Observable<Image> {
    return this.http.put<Image>(`${this.url}images/${id}`, picture)
  }

  addComment(image_id: string, comment: string): Observable<string> {
    const body = {
      'comment': comment
    }
    return this.http.patch<string>(`${this.url}images/${image_id}`,
      JSON.stringify(body), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    })
  }

  getTodayPicture(): Observable<Image> {
    const today = DateTime.now().toFormat('yyyy-LL-dd')
    const user_id = this.getToken()
    this.http.get(`${this.url}images?date=${today}&?user_id=${user_id}`)
    return this.http
      .get<Image[]>(`${this.url}images?date=${today}&user_id=${user_id}`)
      .pipe(map((res) => res[0]))
  }



  getFriends(idUser: string) {
    return this.http.get<User[]>(`${this.url}users?id_ne=${idUser}`);
  }

  setToken(token: string) {
    this.logged = true;
    this.cookies.set('token', token);
  }

  getToken() {
    return this.cookies.get('token');
  }

  deleteToken() {
    this.logged = false;
    localStorage.removeItem('usuario');
    this.cookies.delete('token');
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Accept',
          cssClass: 'alert-button-accept',
        },
      ],
    });
    await alert.present();
    return;
  }
}
