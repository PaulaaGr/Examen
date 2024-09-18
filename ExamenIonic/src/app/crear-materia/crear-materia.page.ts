import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.page.html',
  styleUrls: ['./crear-materia.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonButton]
})
export class CrearMateriaPage implements OnInit {
  materia: { nombre: string } = { nombre: '' };

  constructor(private router: Router) { }

  ngOnInit() { }

  guardarMateria() {
    // Asumiendo que el array de materias está en MateriasPage
    const materias = JSON.parse(localStorage.getItem('materias') || '[]');
    materias.push({ nombre: this.materia.nombre, promedio: 0, aprobada: false });
    localStorage.setItem('materias', JSON.stringify(materias));

    // Redirigir a la página de materias
    this.router.navigate(['/materias']);
  }
}
