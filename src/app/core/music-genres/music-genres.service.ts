import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { allMusicGenres } from './all-music.genres';

const getMusicGenresUrl
  = () => `/music_genres`;

@Injectable()
export class MusicGenresService {

  loadMusicGenres(): Observable<string[] | HttpErrorResponse> {
    return of(allMusicGenres);
    // return this.httpClient.get<string[]>(
    //   getMusicGenresUrl()
    // );
  }

  constructor(private httpClient: HttpClient) {
  }
}
