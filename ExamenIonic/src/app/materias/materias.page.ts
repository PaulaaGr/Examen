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
  IonButtons,
  IonSearchbar,
  IonMenuButton
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
    IonButtons,
    IonSearchbar,
    IonMenuButton
  ],
})
export class MateriasPage implements OnInit {
  materias: Materia[] = [];
  textoBusqueda: string = ''; 

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarMaterias();
  }

  ionViewWillEnter() {
    this.cargarMaterias();
  }

  cargarMaterias() {
    this.materias = JSON.parse(localStorage.getItem('materias') || '[]');
  }

  verDetalleMateria(materia: Materia) {
    this.router.navigate(['/detalle-materia'], { state: { materia } });
  }

  // Método que se ejecuta al cambiar el texto en la barra de búsqueda
  actualizarFiltro(event: Event) {
    const input = event.target as HTMLInputElement;
    this.textoBusqueda = input.value.toLowerCase(); // Actualiza el texto de búsqueda
  }

  // Filtrar materias basado en el texto de búsqueda
  filtrarMaterias() {
    if (this.textoBusqueda.trim() === '') {
      return this.materias; // Si no hay texto, devuelve todas las materias
    }
    return this.materias.filter(materia =>
      materia.nombre.toLowerCase().includes(this.textoBusqueda)
    );
  }
}