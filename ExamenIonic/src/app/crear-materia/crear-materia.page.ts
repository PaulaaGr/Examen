import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Asegúrate que FormsModule está importado
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonTextarea,
} from '@ionic/angular/standalone'; // Importa IonInput también
import { Materia } from '../models/materia';


@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.page.html',
  styleUrls: ['./crear-materia.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    IonTextarea,
  ], // Asegúrate de incluir IonInput
})
export class CrearMateriaPage {
  materia: Materia = {
    nombre: '',
    semestre: 0,
    codigo: '',
    observaciones: ''
  };

  constructor(private router: Router) {}

  actualizarCampo(campo: keyof Materia, event: Event) {
    const target = event.target as HTMLInputElement;

    // Ajuste para manejar el tipo de 'semestre' que es un número
    if (campo === 'semestre') {
      this.materia[campo] = Number(target.value); // Convertir a número
    } else {
      this.materia[campo] = target.value; // Asignar el valor correspondiente
    }
  }

  guardarMateria() {
    const materias: Materia[] = JSON.parse(localStorage.getItem('materias') || '[]');
    materias.push({ ...this.materia });
    localStorage.setItem('materias', JSON.stringify(materias));
    this.router.navigate(['/materias']); // Redirigir después de guardar
}
}