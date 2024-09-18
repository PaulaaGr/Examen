import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    RouterModule
  ],
})
export class MateriasPage implements OnInit {
  materias: any[] = [];

  constructor() {}

  ngOnInit() {
    this.cargarMaterias();
  }

  cargarMaterias() {
    this.materias = JSON.parse(localStorage.getItem('materias') || '[]');
  }
}

