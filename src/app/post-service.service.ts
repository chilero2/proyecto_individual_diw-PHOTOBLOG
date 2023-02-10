import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, Users } from './interfaces/users';
import { AlertController } from '@ionic/angular';
import { catchError, map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Image } from './interfaces/images';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  logged = false;

  // url = 'http://192.168.8.101:3000/'
  url = 'http://localhost:3000/';

  constructor(
    private cookies: CookieService,
    public http: HttpClient,
    private route: Router,
    private alertController: AlertController
  ) {}

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
