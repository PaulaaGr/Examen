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
    loadComponent: () => import('./materias/materias.page').then(m => m.MateriasPage),
  },
  {
    path: 'crear-materia',
    loadComponent: () => import('./crear-materia/crear-materia.page').then(m => m.CrearMateriaPage),
  },
  {
    path: 'detalle-materia', 
    loadComponent: () => import('./detalle-materia/detalle-materia.page').then(m => m.DetalleMateriaPage),
  },
  {
    path: 'agregar-notas',
    loadComponent: () => import('./agregar-notas/agregar-notas.page').then( m => m.AgregarNotasPage)
  },
  {
    path: 'ver-notas',
    loadComponent: () => import('./ver-notas/ver-notas.page').then( m => m.VerNotasPage)
  },
  {
    path: 'modificar-nota',
    loadComponent: () => import('./modificar-nota/modificar-nota.page').then( m => m.ModificarNotaPage)
  },
];
