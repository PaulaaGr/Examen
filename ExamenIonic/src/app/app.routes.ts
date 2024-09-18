import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'materias',
    loadComponent: () => import('./materias/materias.page').then( m => m.MateriasPage)
  },
  {
    path: 'crear-materia',
    loadComponent: () => import('./crear-materia/crear-materia.page').then( m => m.CrearMateriaPage)
  },
];
