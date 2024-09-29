import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonButtons
} from '@ionic/angular/standalone';
import { Materia } from '../models/materia';

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
    RouterModule,
    IonButtons
  ],
})
export class MateriasPage implements OnInit {
  materias: Materia[] = [];

  constructor(private router: Router) {} // Inyectar Router aquí

  ngOnInit() {
    this.cargarMaterias(); // Cargar las materias al iniciar
  }

  ionViewWillEnter() {
    this.cargarMaterias(); // Cargar las materias cada vez que se entra a la vista
  }

  cargarMaterias() {
    this.materias = JSON.parse(localStorage.getItem('materias') || '[]');
  }

  verDetalleMateria(materia: Materia) {
    this.router.navigate(['/detalle-materia'], { state: { materia } }); // Ahora 'router' está disponible
  }
}