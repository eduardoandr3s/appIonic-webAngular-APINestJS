import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {
  ApiResponseCategories,
  ApiResponseMessage,
  ApiResponseSerie,
  ApiResponseSeries,
  Serie
} from "../common/interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);


  getSeries():Observable<ApiResponseSeries> {
    return this.http.get<ApiResponseSeries>(environment.UrlApi)
  }

  getCategories():Observable<ApiResponseCategories>{
    return this.http.get<ApiResponseCategories>(environment.UrlApi+'/categories')
  }

  getSeriesCategoria(id: string) :Observable<Serie[]>{
    return this.http.get<Serie[]>(environment.UrlApi+'/categories/'+id)
  }

  getSerie(id: string) :Observable<ApiResponseSerie> {
    return this.http.get<ApiResponseSerie>(environment.UrlApi+'/serie/'+id)
  }

  updateSerie(serie: Serie): Observable<ApiResponseMessage> {
    return this.http.put<ApiResponseMessage>(`${environment.UrlApi}/${serie._id}`, serie);
  }

  getByName(textSearch:string):Observable<ApiResponseSeries> {
    return this.http.get<ApiResponseSeries>(`${environment.UrlApi}/byName?name=${textSearch}`)
  }


  constructor() { }
}
