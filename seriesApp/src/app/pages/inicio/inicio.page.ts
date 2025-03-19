import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard, IonCardTitle, IonChip,
  IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon,
  IonImg,
  IonList, IonMenuButton,
  IonTitle, IonToolbar, IonInfiniteScroll, IonInfiniteScrollContent, IonLabel, IonText
} from "@ionic/angular/standalone";
import {RouterLink} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {ToastService} from "../../services/toast.service";
import {ApiResponseCategories, ApiResponseSeries, Category, Serie} from "../../common/interface";
import {InfiniteScrollCustomEvent} from "@ionic/angular";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonCard, IonImg, IonContent, IonList,
    IonAvatar, IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle,
    IonToolbar, RouterLink, IonFab, IonFabButton, IonFabList, IonCardTitle, IonChip,
    IonInfiniteScroll, IonInfiniteScrollContent, IonLabel, IonText],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InicioPage implements OnInit {
  private readonly apiService: ApiService = inject(ApiService)
  private readonly toastService: ToastService = inject(ToastService)
  series: Serie[] = [];
  dataCategories: Category[] = [];

  displayedSeries: Serie[] = [];
  private currentPage = 0;
  private readonly initialLoad = 5;
  private readonly subsequentLoad = 3;
  private allSeriesLoaded = false;

  private loadSeries(event?: InfiniteScrollCustomEvent){
    this.apiService.getSeries().subscribe(
      {
        next: (data: ApiResponseSeries) =>{
          this.series = data.data.sort(
            (a, b) =>
              new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
          this.loadMoreData(event);
          },
        error: err => {
          console.error(err.message);
          if (event) event.target.complete();
        },
        complete: () => {
          console.log('Series loaded');
          this.toastService.mostrarToast("Series loaded!!", 2000, "success");
        }
      }
    )
  }

  private loadCategories() {
    this.apiService.getCategories().subscribe(
      {
        next: (data: ApiResponseCategories) => {
          this.dataCategories = data.data
        },
        error: err => {
          console.error(err.message);
        },
        complete: () => {
          console.log('Avatar Category loaded');
        }
      }
    );
  }

  private loadMoreData(event?: InfiniteScrollCustomEvent) {
    if (this.currentPage === 0) {
      const initialSeries = this.series.slice(0, this.initialLoad);
      this.displayedSeries = [...this.displayedSeries, ...initialSeries];
      this.currentPage++;
      if (event) event.target.complete();
      return;
    }

    const startIndex = this.initialLoad + (this.currentPage - 1) * this.subsequentLoad;
    const endIndex = startIndex + this.subsequentLoad;

    if (startIndex >= this.series.length) {
      this.allSeriesLoaded = true;
      if (event) event.target.complete();
      return;
    }

    const newSeries = this.series.slice(startIndex, endIndex);

    setTimeout(() => {
      this.displayedSeries = [...this.displayedSeries, ...newSeries];
      this.currentPage++;

      if (event) event.target.complete();
    }, 1500);
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    if (!this.allSeriesLoaded) {
      this.loadMoreData(event);
    } else {
      event.target.complete();

    }
  }


  constructor() {
    this.loadSeries();
  }
  ngOnInit() {}

}
