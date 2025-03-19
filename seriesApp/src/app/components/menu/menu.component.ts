import {Component, inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  IonAvatar,
  IonButton, IonButtons,
  IonContent,
  IonHeader, IonImg, IonItem, IonLabel, IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonTitle
} from "@ionic/angular/standalone";
import {ApiResponseCategories, ApiResponseSeries, Category, Serie} from "../../common/interface";
import {ApiService} from "../../services/api.service";
import {InfiniteScrollCustomEvent} from "@ionic/angular";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [
    IonMenu,
    IonHeader,
    IonTitle,
    IonContent,
    IonMenuToggle,
    IonButton,
    IonRouterOutlet,
    IonList,
    IonItem,
    IonAvatar,
    IonImg,
    IonLabel,
    IonButtons,
    RouterLink
  ]
})
export class MenuComponent implements OnInit, OnChanges {
  private readonly apiService: ApiService = inject(ApiService)
  dataCategories: Category[] = [];

  constructor() {
    this.loadCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
        this.loadCategories();
    }

  private loadCategories(event?: InfiniteScrollCustomEvent) {
    this.apiService.getCategories().subscribe(
      {
        next: (data: ApiResponseCategories) => {
          this.dataCategories = data.data
        },
        error: err => {
          console.error(err.message);
        },
        complete: () => {
          console.log('Series loaded');

        }
      }
    )
  }

  ngOnInit() {
  }

}
