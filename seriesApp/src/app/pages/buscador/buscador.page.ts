import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule, SlicePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from "../../components/header/header.component";
import {
  IonAvatar,
  IonContent,
  IonImg, IonInfiniteScroll, IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar
} from "@ionic/angular/standalone";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {ApiResponseSeries, Serie} from "../../common/interface";
import {InfiniteScrollCustomEvent} from "@ionic/angular";
import {FiltroPipe} from "../../pipes/filtro.pipe";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
  standalone: true,
    imports: [CommonModule, FormsModule, HeaderComponent,
        IonContent, IonImg, IonList, IonItem,
        IonAvatar, IonLabel, IonSearchbar, RouterLink, IonInfiniteScroll, IonInfiniteScrollContent, SlicePipe]
})
export class BuscadorPage implements OnInit {

  private readonly apiService: ApiService = inject(ApiService)
  private readonly toastService: ToastService = inject(ToastService)
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll!: IonInfiniteScroll;

  stringSearch = '';

  displayedSeries: Serie[] = [];

  private seriesLoaded: Serie[] = [];

  search(event: any) {
    const query = event.detail.value;
    this.stringSearch = query;

    if (query.length > 1) {
      this.apiService.getByName(this.stringSearch).subscribe({
        next: (res) => {
          if (res.status === 'Ok') {
            this.seriesLoaded = res.data;
            this.displayedSeries = this.seriesLoaded.splice(0, 5);
            this.infiniteScroll.disabled = false;
          } else {
            console.error('Error al buscar series:');
          }
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
    } else {
      this.seriesLoaded = [];
      this.displayedSeries = []
    }
  }

  constructor() {

  }

  ngOnInit() {

  }


  onIonInfinite(event: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      if (this.seriesLoaded.length > 0) {
        this.displayedSeries.push(...this.seriesLoaded.splice(0, 3));
      }
      event.target.complete();

      if (this.seriesLoaded.length === 0) {
        event.target.disabled = true;
      }
    }, 1500);

  }
}

