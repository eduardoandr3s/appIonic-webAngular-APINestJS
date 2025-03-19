import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  ApiResponseCategories,
  ApiResponseMessage,
  ApiResponseSerie,
  ApiResponseSeries,
  Category,
  Serie
} from "../common/serie";
import {environment} from "../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class SerieService {


  private readonly http: HttpClient = inject(HttpClient)

  constructor() {
  }

  getSeries(): Observable<ApiResponseSeries> {
    return this.http.get<ApiResponseSeries>(environment.apiURL)
  }

  getSerie(id: string): Observable<ApiResponseSerie> {
    return this.http.get<ApiResponseSerie>(`${environment.apiURL}/serie/${id}`)
  }

  getCategory(): Observable<Serie> {
    return this.http.get<Serie>(environment.apiURL + '/categories')
  }

  addSerie(serie: Serie): Observable<ApiResponseMessage> {
    return this.http.post<ApiResponseMessage>(environment.apiURL, serie)
  }


  updateSerie(serie: Serie): Observable<ApiResponseMessage> {
    return this.http.put<ApiResponseMessage>(environment.apiURL + '/' + serie._id, serie)
  }

  updatePatchSerie(serie: Serie): Observable<ApiResponseMessage> {
    return this.http.patch<ApiResponseMessage>(environment.apiURL + '/' + serie._id, serie.title)
  }

  deleteSerie(id: string): Observable<ApiResponseMessage> {
    return this.http.delete<ApiResponseMessage>(environment.apiURL + '/' + id)
  }

  getCategories(): Observable<ApiResponseCategories> {
    return this.http.get<ApiResponseCategories>(environment.apiURL + '/categories');
  }

}
