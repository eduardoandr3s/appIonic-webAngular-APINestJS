import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {
  add,
  arrowBackCircleSharp,
  call, chevronDownCircleSharp,
  homeSharp,
  logoFacebook, logoGithub, logoInstagram, logoTiktok, logoX, logoYoutube,
  person,
  searchSharp,
  settings,
  videocamSharp
} from "ionicons/icons";
import {addIcons} from "ionicons";
import {MenuComponent} from "./components/menu/menu.component";
import {register} from "swiper/element/bundle";

register()
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuComponent],
})
export class AppComponent {



  constructor() {
    addIcons({settings, call, person, arrowBackCircleSharp, searchSharp,videocamSharp,
      homeSharp, logoFacebook, logoGithub, logoInstagram, logoYoutube, logoX, logoTiktok,chevronDownCircleSharp})
  }
}


