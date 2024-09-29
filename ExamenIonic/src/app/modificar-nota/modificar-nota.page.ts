import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  IonDatetime,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Nota } from '../models/nota';

@Component({
  selector: 'app-modificar-nota',
  templateUrl: './modificar-nota.page.html',
  styleUrls: ['./modificar-nota.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonDatetime,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption
  ],
})
export class ModificarNotaPage implements OnInit {
  nota: Nota = {
    fechaEntrega: '',
    descripcion: '',
    nota: 0,
    observaciones: '',
    corte: '',
    codigoMateria: '',
  };

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['nota']) {
      this.nota = navigation.extras.state['nota'];
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
    }
  }

  guardarModificacion() {
    const notasGuardadas: Nota[] = JSON.parse(
      localStorage.getItem('notas') || '[]'
    );
    const index = notasGuardadas.findIndex(
      (n) =>
        n.fechaEntrega === this.nota.fechaEntrega &&
        n.descripcion === this.nota.descripcion
    );

    if (index !== -1) {
      notasGuardadas[index] = this.nota; // Actualiza la nota
      localStorage.setItem('notas', JSON.stringify(notasGuardadas));
      this.router.navigate(['/ver-notas']); // Navega a la página de ver notas
    }
  }

  irADetalleMateria() {
    this.router.navigate(['/detalle-materia'], {
      state: { materia: this.nota.codigoMateria },
    });
  }
}
