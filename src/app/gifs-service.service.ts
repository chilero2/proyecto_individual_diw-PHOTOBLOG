import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIF } from './interfaces/gifs';

@Injectable({
  providedIn: 'root',
})
export class GifsServiceService {
  private apiKey: string = 'hiX5Z0oyDKhn4Z08lVqBBA7HqCX2gPaH';
  private query: string = '';
  private url: string = 'https://api.giphy.com/v1/gifs';


  constructor(public http: HttpClient) { }

  buscarGifs(query: string) {
    if (query.trim().length === 0) return;

    const params = new HttpParams()
      .set("api_key", this.apiKey)
      .set("limit", "50")
      .set("q", query)


    return this.http
      .get<SearchGIF>(
        `${this.url}/search`, { params })
  }




}
