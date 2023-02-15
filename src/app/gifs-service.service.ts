import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsServiceService {
  private apiKey: string = 'hiX5Z0oyDKhn4Z08lVqBBA7HqCX2gPaH';
  private query: string = '';
  private url: string = 'https://api.giphy.com/v1/gifs';

  params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', this.query);

  constructor(public http: HttpClient) {}
}
