import { Component, OnInit } from '@angular/core';
import {
  IonAvatar,
   IonButton,
  IonButtons,
  IonHeader, IonIcon,
  IonImg,
  IonMenuButton,
  IonTitle,
  IonToolbar, NavController
} from "@ionic/angular/standalone";
import {RouterLink, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    RouterLink,
    IonAvatar,
    IonImg,
    IonButton,
    IonIcon
  ]
})
export class HeaderComponent  implements OnInit {
  showButton: boolean = true;
  constructor(private navCtrl: NavController, public router: Router) {


  }



  ngOnInit() {

  }

  volver() {
    this.navCtrl.back()

  }
}
