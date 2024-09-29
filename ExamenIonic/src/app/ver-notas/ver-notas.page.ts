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
  AlertController,
} from '@ionic/angular/standalone';
import { Nota } from '../models/nota'; // Importa la interfaz Nota
import { Materia } from '../models/materia'; // Importa la interfaz Materia

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

  notasPorCorte: { [corte: string]: Nota[] } = {
    'Primer 20%': [],
    'Segundo 20%': [],
    'Tercer 20%': [],
    '40% Final': [],
  };

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    this.materia = this.router.getCurrentNavigation()?.extras.state?.['materia'];
    if (this.materia) {
      this.cargarNotas();
    } else {
      console.error('No se pudo obtener la materia al navegar.');
    }
  }

  cargarNotas() {
    const notasGuardadas: Nota[] = JSON.parse(localStorage.getItem('notas') || '[]');

    this.notasPorCorte = {
      'Primer 20%': [],
      'Segundo 20%': [],
      'Tercer 20%': [],
      '40% Final': [],
    };

    if (this.materia?.codigo) {
      const notasMateria = notasGuardadas.filter(nota => nota.codigoMateria === this.materia.codigo);

      notasMateria.forEach(nota => {
        if (this.notasPorCorte[nota.corte]) {
          this.notasPorCorte[nota.corte].push(nota);
        }
      });

      console.log('Notas agrupadas por corte:', this.notasPorCorte);
    }
  }

  async confirmarEliminarNotasPorCorte(corte: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar todas las notas del corte ${corte} para esta materia? Esta acción no se puede deshacer.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarNotasPorCorte(corte);
          },
        },
      ],
    });

    await alert.present();
  }

  eliminarNotasPorCorte(corte: string) {
    const notasGuardadas: Nota[] = JSON.parse(localStorage.getItem('notas') || '[]');

    const nuevasNotas = notasGuardadas.filter(nota => 
      !(nota.codigoMateria === this.materia.codigo && nota.corte === corte)
    );

    localStorage.setItem('notas', JSON.stringify(nuevasNotas));

    this.cargarNotas();
  }

  async confirmarEliminarNota(nota: Nota) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar la nota: "${nota.descripcion}"? Esta acción no se puede deshacer.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarNota(nota);
          },
        },
      ],
    });

    await alert.present();
  }

  eliminarNota(notaAEliminar: Nota) {
    const notasGuardadas: Nota[] = JSON.parse(localStorage.getItem('notas') || '[]');

    const nuevasNotas = notasGuardadas.filter(nota => 
      !(nota.codigoMateria === this.materia.codigo && nota.fechaEntrega === notaAEliminar.fechaEntrega)
    );

    localStorage.setItem('notas', JSON.stringify(nuevasNotas));

    this.cargarNotas();
  }

  modificarNota(nota: Nota) {
    this.router.navigate(['/agregar-notas'], {
      state: {
        materia: this.materia,
        nota: nota,
        esEditar: true // Indicar que es una modificación de la nota
      }
    });
  }

  volverADetalleMateria() {
    this.router.navigate(['/detalle-materia'], { state: { materia: this.materia } });
  }
}
