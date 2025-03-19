import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonAvatar, IonCard, IonContent, IonFab, IonFabButton, IonFabList, IonIcon,
  IonImg, IonLabel, IonList, IonInfiniteScroll, IonInfiniteScrollContent
} from '@ionic/angular/standalone';
import {ToastService} from "../../services/toast.service";
import {ApiService} from "../../services/api.service";
import {ApiResponseCategories, Category, Serie} from "../../common/interface";
import {HeaderComponent} from "../../components/header/header.component";
import {RouterLink} from "@angular/router";
import {InfiniteScrollCustomEvent} from "@ionic/angular";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonAvatar, IonImg, IonLabel, IonContent,
    IonCard, IonList, HeaderComponent, RouterLink, IonFab, IonFabButton, IonFabList,
    IonIcon, IonInfiniteScroll, IonInfiniteScrollContent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoriaPage implements OnChanges {
  private toastService = inject(ToastService);
  private readonly apiService: ApiService = inject(ApiService)


  @Input('id') id!: string;

  series: Serie[] = [];
  dataCategories: Category[] = [];
  avatarSelectedId: string | null = null;
  displayedSeries: Serie[] = [];

  private currentPage = 0;
  private readonly initialLoad = 5;
  private readonly subsequentLoad = 3;
  private allSeriesLoaded = false;

  constructor() {
    this.loadCategories()

  }


  ngOnChanges(changes: SimpleChanges): void {

    if (changes['id']) {
      console.log(this.id);
      if (this.id) {
        this.avatarSelectedId = this.id;
        this.loadSeries(this.id);
      }
    }


  }

  private loadSeries(id: string, event?: InfiniteScrollCustomEvent) {
    this.apiService.getSeriesCategoria(id).subscribe(
      {
        next: (data: Serie[]) => {
          this.series = data.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
          this.loadMoreData(event);
        },
        error: err => {
          console.error(err.message);
        },
        complete: () => {
          console.log('Series loaded');
          this.toastService.mostrarToast("Series loaded!!", 2000, "success");
        }
      }
    );
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

  protected readonly AppComponent = AppComponent;
}
