// ============================================
// COMPONENTE MOVIE LIST - Lista de Películas
// ============================================
// Muestra todas las películas con sus categorías y actores
// Permite crear, editar y eliminar películas

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MovieActorService } from '../../services/movie-actor.service';
import { MovieWithDetails } from '../../models/movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  movies: MovieWithDetails[] = [];
  loading = true;

  constructor(
    private movieService: MovieService,
    private movieActorService: MovieActorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading = true;
    
    this.movieService.getMoviesWithDetails().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar películas:', error);
        this.loading = false;
      }
    });
  }

  onEdit(movieId: string): void {
    this.router.navigate(['/movies/edit', movieId]);
  }

  onDelete(movieId: string, movieTitle: string): void {
    if (confirm(`¿Estás seguro de eliminar la película "${movieTitle}"?`)) {
      // Primero eliminar las relaciones con actores
      this.movieActorService.removeAllActorsFromMovie(movieId).subscribe({
        next: () => {
          // Luego eliminar la película
          this.movieService.deleteMovie(movieId).subscribe({
            next: (success) => {
              if (success) {
                alert('Película eliminada exitosamente');
                this.loadMovies();
              } else {
                alert('Error al eliminar la película');
              }
            },
            error: (error) => {
              console.error('Error al eliminar película:', error);
              alert('Error al eliminar la película');
            }
          });
        },
        error: (error) => {
          console.error('Error al eliminar relaciones de actores:', error);
          alert('Error al eliminar la película');
        }
      });
    }
  }

  onCreateNew(): void {
    this.router.navigate(['/movies/new']);
  }
}