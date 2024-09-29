import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonTextarea,
  IonDatetime,
  IonContent,
  IonButtons,
  IonSelectOption,
  IonSelect
} from '@ionic/angular/standalone';
import { Nota } from '../models/nota'; // Importa la interfaz Nota

@Component({
  selector: 'app-agregar-notas',
  templateUrl: './agregar-notas.page.html',
  styleUrls: ['./agregar-notas.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    CommonModule,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    IonTextarea,
    IonDatetime,
    IonContent,
    IonButtons,
    IonSelectOption,
    IonSelect
  ],
})
export class AgregarNotasPage implements OnInit {
  nota: Nota = {
    fechaEntrega: '',
    descripcion: '',
    nota: 0,
    observaciones: '',
    corte: '',
    codigoMateria: '' // Inicializar 'codigoMateria'
  };

  materia: { [key: string]: any } = {};

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && navigation.extras.state['materia']) {
      this.materia = navigation.extras.state['materia'];
      
      if (!this.materia['codigo']) {
        console.error('La materia no tiene un código válido.');
      } else {
        this.nota.codigoMateria = this.materia['codigo']; // Asignar el código de la materia a la nota
        this.cargarNotas();
      }
    }
  }

  cargarNotas() {
    const notasGuardadas = JSON.parse(localStorage.getItem('notas') || '[]');
    const notasFiltradas = notasGuardadas.filter((nota: Nota) => nota.codigoMateria === this.materia['codigo']);

    if (notasFiltradas.length > 0) {
      this.nota = notasFiltradas[0];
    } else {
      console.log('No hay notas guardadas para esta materia.');
    }
  }

  actualizarCampo(campo: string, valor: any) {
    switch (campo) {
      case 'fechaEntrega':
        this.nota.fechaEntrega = valor;
        break;
      case 'descripcion':
        this.nota.descripcion = valor;
        break;
      case 'nota':
        this.nota.nota = valor;
        break;
      case 'observaciones':
        this.nota.observaciones = valor;
        break;
      case 'corte':
        this.nota.corte = valor; // Agregar el manejo del corte
        break;
      default:
        console.error('Campo no válido');
    }
  }

  guardarNota() {
    if (this.nota.nota === undefined || this.nota.nota === null) {
      this.nota.nota = 0;
    }

    const notasGuardadas = JSON.parse(localStorage.getItem('notas') || '[]');

    if (this.materia && this.materia['codigo']) {
      const index = notasGuardadas.findIndex((nota: Nota) => nota.codigoMateria === this.materia['codigo']);

      if (index > -1) {
        notasGuardadas[index] = { ...this.nota, codigoMateria: this.materia['codigo'] };
      } else {
        notasGuardadas.push({ ...this.nota, codigoMateria: this.materia['codigo'] });
      }

      localStorage.setItem('notas', JSON.stringify(notasGuardadas));
      console.log('Nota guardada correctamente:', notasGuardadas);
    } else {
      console.error('La materia no tiene un código válido.');
    }

    this.router.navigate(['/detalle-materia'], { state: { materia: this.materia } });
  }

  irADetalleMateria() {
    this.router.navigate(['/detalle-materia'], { state: { materia: this.materia } });
  }
}