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
  IonSelect,
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
    codigoMateria: ''
  };

  materia: { [key: string]: any } = {};

  constructor(private router: Router) {}

  ngOnInit() {
    this.materia = this.router.getCurrentNavigation()?.extras.state?.['materia'];
    if (this.materia) {
      console.log('Materia recibida:', this.materia);
    } else {
      console.error('No se recibió la materia al navegar.');
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
        this.nota.nota = valor ? parseFloat(valor) : 0;
        break;
      case 'observaciones':
        this.nota.observaciones = valor;
        break;
      case 'corte':
        this.nota.corte = valor;
        break;
      default:
        console.error('Campo no válido:', campo);
    }
  }

  guardarNota() {
    if (!this.nota.corte || !this.materia['codigo']) {
      console.warn('No se puede guardar la nota: Corte o código de materia no definidos.');
      return;
    }

    const notasGuardadas = JSON.parse(localStorage.getItem('notas') || '[]');
    const nuevaNota = { ...this.nota, codigoMateria: this.materia['codigo'] };

    notasGuardadas.push(nuevaNota);

    localStorage.setItem('notas', JSON.stringify(notasGuardadas));

    console.log('Notas guardadas:', notasGuardadas);
    this.router.navigate(['/detalle-materia'], { state: { materia: this.materia } });
  }

  irADetalleMateria() {
    this.router.navigate(['/detalle-materia'], { state: { materia: this.materia } });
  }
}