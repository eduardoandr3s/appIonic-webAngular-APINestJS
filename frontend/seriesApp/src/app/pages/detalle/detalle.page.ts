import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonAvatar, IonBadge, IonButton, IonButtons, IonCard, IonCardTitle, IonChip,
  IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonIcon,
  IonImg, IonInput, IonItem,
  IonLabel, IonList,
  IonLoading, IonModal, IonRange,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";
import {Punctuation, Serie} from "../../common/interface";
import {ToastService} from "../../services/toast.service";
import {ApiService} from "../../services/api.service";
import {HeaderComponent} from "../../components/header/header.component";
import {AppComponent}  from "../../app.component";


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [IonContent, IonTitle, IonToolbar, CommonModule, FormsModule, IonAvatar, IonImg, IonLabel, RouterLink, IonLoading, HeaderComponent, IonCard, IonCardTitle, IonGrid, IonChip, IonRange, IonItem, IonBadge, IonButton, IonList, IonButtons, IonModal, IonInput, IonFab, IonFabButton, IonIcon, IonFabList],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetallePage implements OnInit {

  private toastService = inject(ToastService);
  private readonly apiService: ApiService = inject(ApiService)
  myPunctuation: Punctuation = {email: '', punctuationNumber: 1};
  updatePunctuationLabel!: number;
  @ViewChild(IonModal) modal!: IonModal;

  @Input('id') id!: string;

  serie!: Serie;

  constructor() {
  }

  ngOnInit() {
    this.loadSerie(this.id);
    this.calculatePunctuation();
  }

  private loadSerie(id: string) {
    this.apiService.getSerie(id).subscribe(
      {
        next: data => {
          console.log(data);
          this.serie = data.data;
        },
        error: err => {
          console.error(err.message);
        },
        complete: () => {
          console.log('Serie loaded');
          this.calculatePunctuation();
          this.toastService.mostrarToast("Serie loaded!!", 2000, "success");
        }
      }
    )
  }

  sendPunctuation(serie: Serie) {
    if (!this.serie.punctuation) {
      this.serie.punctuation = [];
    }
    console.log(this.myPunctuation.punctuationNumber + "log de my puntutation con number");
    console.log(this.myPunctuation + "log del punctuation objeto");
    console.log(serie.punctuation + "log de la serie");

    this.serie.punctuation?.push(this.myPunctuation);


    this.apiService.updateSerie(serie).subscribe({
      next: (response) => {
        console.log('Puntuación enviada y serie actualizada', response);
        console.log(serie.punctuation + "log del next");
        this.toastService.mostrarToast("Puntuación enviada con éxito", 2000, "success");
      },
      error: (err) => {
        console.error('Error al enviar la puntuación', err);
        this.toastService.mostrarToast("Error al enviar la puntuación", 2000, "danger");
      }, complete: () => {
        this.loadSerie(this.id);

      }
    });

    this.modal.dismiss(null, 'cancel');

  }

  savePunctuation(event: any) {
    console.log(event.detail.value + " log del save");

    this.myPunctuation.punctuationNumber = event.detail.value;

  }

  private calculatePunctuation() {
    if (!this.serie || !this.serie.punctuation || this.serie.punctuation.length === 0) {
      console.log(this.serie)
      this.updatePunctuationLabel = 0;
    } else {
      var totalRating: number = 0;

      this.serie.punctuation?.forEach(rating => {
        totalRating += rating.punctuationNumber
      });
      this.updatePunctuationLabel = (totalRating / this.serie.punctuation.length);
      console.log(this.updatePunctuationLabel);
    }
  }
}
