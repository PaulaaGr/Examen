import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonContent,
} from '@ionic/angular/standalone';
import { Materia } from '../models/materia'; // Importa la interfaz Materia
import { Nota } from '../models/nota'; // Importa la interfaz Nota

@Component({
  selector: 'app-ver-notas',
  templateUrl: './ver-notas.page.html',
  styleUrls: ['./ver-notas.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    CommonModule,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonContent,
  ],
})
export class VerNotasPage implements OnInit {
  materia: Materia = {
    nombre: '',
    semestre: 0,
    codigo: '',
    observaciones: '',
  };
  
  notas: Nota[] = []; // Cambia el tipo a Nota[]

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && navigation.extras.state['materia']) {
      this.materia = navigation.extras.state['materia'] as Materia; // Tipado como Materia
      this.cargarNotas(); // Cargar las notas al iniciar
    }
  }

  cargarNotas() {
    const notasGuardadas = JSON.parse(localStorage.getItem('notas') || '[]');
    // Filtrar las notas que pertenecen a la materia actual usando 'codigoMateria'
    this.notas = notasGuardadas.filter((nota: Nota) => nota.codigoMateria === this.materia.codigo);
    console.log('Notas cargadas:', this.notas); // Verificar las notas cargadas
  }

  volverADetalleMateria() {
    console.log('Navegando a Detalle de Materia con:', this.materia);
    this.router.navigate(['/detalle-materia'], { state: { materia: this.materia } });
  }
  
}