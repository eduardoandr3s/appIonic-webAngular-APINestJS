import {Component, inject, NgModule} from '@angular/core';
import {SerieService} from "../../services/serie.service";
import {Serie} from "../../common/serie";
import {RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {DatePipe, SlicePipe} from "@angular/common";


@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [
    RouterLink, SlicePipe, DatePipe
  ],
  templateUrl: './series-list.component.html',
  styleUrl: './series-list.component.css'
})

export class SeriesListComponent {
  private readonly serieService: SerieService = inject(SerieService);
  private dialog: MatDialog = inject(MatDialog);
  series: Serie[] = [];
  seriesList: Serie[] = [];
  toast = {
    color: "bg-warning",
    body: '',
    duration: 2000
  }
  toastShow = false;
  infoLoaded = false;

  constructor() {
    this.loadSeries();
  }


  private loadSeries() {
    this.serieService.getSeries().subscribe({
      next: value => {
        this.seriesList = value.data;
        this.series = value.data;
        this.infoLoaded = true;
      },
      complete: () => {
        this.showToast('Series loaded successfully.', 'bg-danger');
      },
      error: error => {
        this.showToast(error.message, 'bg-warning');
      }
    });
  }

  private showToast(message: string, color: string) {
    this.toast.body = message;
    this.toast.color = color;
    this.toastShow = true;
    setTimeout(() => {
      this.toastShow = false;
    }, 2000);
  }

  search(event: any) {
    this.seriesList = this.series.filter((serie) => (
      serie.title.toLowerCase().indexOf(event) >= 0 ||
      serie.synopsis.toLowerCase().indexOf(event) >= 0
    ));
  }


  deleteSerie(serie: Serie) {
    const cardElement = document.getElementById(`serie-card-${serie._id}`);
    if (cardElement) {
      cardElement.classList.add('destroy-animation');

      setTimeout(() => {
        if (serie._id) {
          this.serieService.deleteSerie(serie._id).subscribe({
            next: value => {
              this.showToast(value.message, 'bg-success');
              this.loadSeries();
            },
            error: err => {
              this.showToast(err.message, 'bg-danger');
            }
          });
        }
      }, 600);
    }
  }

/*  deleteSerie(serie: Serie) {
    if (serie._id) this.serieService.deleteSerie(serie._id).subscribe({
      next: value => {
        this.showToast(value.message, 'bg-success');
        this.loadSeries();
      }, error: err => {
        this.showToast(err.message, 'bg-danger');
      }
    });
  }*/



  private dialogRefInstance: any = null;
  openConfirmDialog(serie: Serie) {
    if (this.dialogRefInstance && this.dialogRefInstance.getState() !== 2) {
      return;
    }

    this.dialogRefInstance = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      maxHeight: '80vh',
      disableClose: true,
      data: { message: 'Are you sure you want to delete this series?' },
      panelClass: 'custom-dialog-container',
      hasBackdrop: true,
      backdropClass: 'custom-backdrop',
    });

    setTimeout(() => {
      requestAnimationFrame(() => {
        const dialogElement = document.querySelector('.custom-dialog-container');
        if (dialogElement) {
          dialogElement.setAttribute('style', 'top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; position: fixed !important; z-index: 1050 !important;');
        }
      });
    }, 100);

    this.dialogRefInstance.afterClosed().subscribe((result: boolean | null) => {
      this.dialogRefInstance = null;
      if (result) {
        this.deleteSerie(serie);
      }
    });
  }

}
