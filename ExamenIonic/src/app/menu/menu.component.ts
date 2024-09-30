import { Component, OnInit } from '@angular/core';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonRouterOutlet,
  IonMenuButton,
  IonContent,
  IonItemDivider,
  IonSearchbar
} from '@ionic/angular/standalone';
import { Router, RouterModule} from '@angular/router';
import { Materia } from '../models/materia';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonButtons,
    IonRouterOutlet,
    IonMenuButton,
    IonContent,
    RouterModule,
    CommonModule,
    IonItemDivider,
    IonSearchbar
  ],
})
export class MenuComponent implements OnInit {
  materias: Materia[] = [];
  filteredMaterias: Materia[] = []; 
  searchTerm: string = ''; 

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarMaterias(); 
  }

  cargarMaterias() {
    this.materias = JSON.parse(localStorage.getItem('materias') || '[]');
  }

  verDetalleMateria(materia: Materia) {
    this.router.navigate(['/detalle-materia'], { state: { materia } }); 
  }
  ionViewWillEnter() {
    this.cargarMaterias(); 
  }
}
