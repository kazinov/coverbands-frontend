import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Countries } from '../countries/counries.model';

const getCitiesUrl
  = () => `/cities`;

@Injectable()
export class CitiesService {

  loadCities(countryId: Countries): Observable<string[] | HttpErrorResponse> {
    return of([
      'saint-petersburg', 'moscow', 'kazan', 'krasnodar'
    ])
    // return this.httpClient.get<string[]>(
    //   getCitiesUrl()
    // );
  }

  constructor(private httpClient: HttpClient) {
  }
}
