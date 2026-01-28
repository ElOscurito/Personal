// ============================================
// CONFIGURACIÓN DE RUTAS
// ============================================
// Define todas las rutas de navegación de la aplicación

import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ActorFormComponent } from './components/actor-form/actor-form.component';

export const routes: Routes = [
  // Ruta por defecto - redirige a la lista de películas
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full'
  },
  
  // Rutas de películas
  {
    path: 'movies',
    component: MovieListComponent
  },
  {
    path: 'movies/new',
    component: MovieFormComponent
  },
  {
    path: 'movies/edit/:id',
    component: MovieFormComponent
  },
  
  // Rutas de categorías
  {
    path: 'categories/new',
    component: CategoryFormComponent
  },
  
  // Rutas de actores
  {
    path: 'actors/select',
    component: ActorFormComponent
  },
  
  // Ruta 404 - cualquier ruta no encontrada redirige a movies
  {
    path: '**',
    redirectTo: '/movies'
  }
];