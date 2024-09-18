import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonButtons,
  IonMenuButton,
  IonCardContent,
  IonInput,
  IonCard,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonMenu,
    IonButtons,
    IonMenuButton,
    IonCardContent,
    IonInput,
    IonCard,
    IonButton,
    RouterModule
  ],
})
export class HomePage {
  constructor() {}
}
