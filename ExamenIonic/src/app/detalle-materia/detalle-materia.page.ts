import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonContent,
  IonButtons,
  AlertController,
  IonMenuButton
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-detalle-materia',
  templateUrl: './detalle-materia.page.html',
  styleUrls: ['./detalle-materia.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    CommonModule,
    FormsModule,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonContent,
    IonButtons,
    IonMenuButton
  ],
})
export class DetalleMateriaPage implements OnInit {
  materia: Materia = {
    nombre: '',
    semestre: 0,
    codigo: '',
    observaciones: '',
  };
  
  editable: boolean = false;

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && navigation.extras.state['materia']) {
      this.materia = navigation.extras.state['materia'];
      console.log('Materia recibida:', this.materia); // Verifica la materia
    } else {
      console.error('No se recibió la materia al navegar.');
    }
  }
  
  

  irAMaterias() {
    this.router.navigate(['/materias']);
  }

  agregarNotas() {
    if (this.materia.codigo) {
      this.router.navigate(['/agregar-notas'], { state: { materia: this.materia } });
    } else {
      console.error('La materia no tiene un código válido.');
    }
  }
  

  verNotas() {
    this.router.navigate(['/ver-notas'], { state: { materia: this.materia } });
  }

  modificarMateria() {
    this.editable = true; // Habilitar campos para modificar
  }

  async eliminarMateria() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Está seguro de que desea eliminar esta materia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.confirmarEliminacion();
          }
        }
      ]
    });

    await alert.present();
  }

  confirmarEliminacion() {
    const materias: Materia[] = JSON.parse(localStorage.getItem('materias') || '[]');
    const index = materias.findIndex(m => m.codigo === this.materia.codigo);

    if (index > -1) {
      materias.splice(index, 1); // Eliminar la materia
      localStorage.setItem('materias', JSON.stringify(materias));
      this.router.navigate(['/materias'], { replaceUrl: true }); // Navegar a la lista de materias
    }
  }

  guardarCambios() {
    if (!this.materia.codigo) {
      console.error('La materia no tiene un código válido al guardar cambios.');
      return;
    }
  
    const materias: Materia[] = JSON.parse(localStorage.getItem('materias') || '[]');
    const index = materias.findIndex(m => m.codigo === this.materia.codigo);
    if (index > -1) {
      materias[index] = this.materia; // Actualiza la materia
      localStorage.setItem('materias', JSON.stringify(materias));
    }
    this.router.navigate(['/materias']); 
  }
  

}