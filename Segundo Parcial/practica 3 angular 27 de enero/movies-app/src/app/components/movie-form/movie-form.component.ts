// ============================================
// COMPONENTE MOVIE FORM - Crear/Editar Película
// ============================================
// Formulario principal que integra categorías y actores
// Este es el componente central de la aplicación

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CategoryService } from '../../services/category.service';
import { MovieActorService } from '../../services/movie-actor.service';
import { Category } from '../../models/category';
import { Actor } from '../../models/actor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.css'
})
export class MovieFormComponent implements OnInit {
  movieForm: FormGroup;
  categories: Category[] = [];
  movieActors: Actor[] = [];
  isEditMode = false;
  movieId: string | null = null;
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private categoryService: CategoryService,
    private movieActorService: MovieActorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      category_id: ['', [Validators.required]],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // Verificar si estamos en modo edición
    this.movieId = this.route.snapshot.paramMap.get('id');
    
    if (this.movieId) {
      this.isEditMode = true;
    }

    // Cargar categorías
    this.loadCategories();

    // Si es modo edición, cargar datos de la película
    if (this.movieId) {
      this.loadMovie(this.movieId);
      this.loadMovieActors(this.movieId);
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  loadMovie(id: string): void {
    this.loading = true;
    
    this.movieService.getMovie(id).subscribe({
      next: (movie) => {
        if (movie) {
          this.movieForm.patchValue({
            title: movie.title,
            category_id: movie.category_id,
            image: movie.image,
            description: movie.description
          });
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar película:', error);
        this.loading = false;
        alert('Error al cargar la película');
        this.router.navigate(['/movies']);
      }
    });
  }

  loadMovieActors(movieId: string): void {
    this.movieActorService.getActorsByMovie(movieId).subscribe({
      next: (actors) => {
        this.movieActors = actors;
      },
      error: (error) => {
        console.error('Error al cargar actores de la película:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.movieForm.invalid) {
      Object.keys(this.movieForm.controls).forEach(key => {
        this.movieForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    const movieData = this.movieForm.value;

    if (this.isEditMode && this.movieId) {
      // Actualizar película existente
      this.movieService.updateMovie(this.movieId, movieData).subscribe({
        next: (result) => {
          if (result) {
            alert('Película actualizada exitosamente');
            this.router.navigate(['/movies']);
          }
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error al actualizar película:', error);
          alert('Error al actualizar la película');
          this.submitting = false;
        }
      });
    } else {
      // Crear nueva película
      this.movieService.createMovie(movieData).subscribe({
        next: (result) => {
          if (result) {
            alert('Película creada exitosamente');
            this.router.navigate(['/movies']);
          }
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error al crear película:', error);
          alert('Error al crear la película');
          this.submitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/movies']);
  }

  goToNewCategory(): void {
    const currentUrl = this.router.url;
    this.router.navigate(['/categories/new'], { 
      queryParams: { returnUrl: currentUrl } 
    });
  }

  goToAddActor(): void {
    if (this.isEditMode && this.movieId) {
      this.router.navigate(['/actors/select'], { 
        queryParams: { movieId: this.movieId } 
      });
    } else {
      alert('Debes guardar la película primero antes de agregar actores');
    }
  }

  removeActor(actorId: string): void {
    if (!this.movieId) return;

    if (confirm('¿Estás seguro de remover este actor de la película?')) {
      this.movieActorService.removeActorFromMovie(this.movieId, actorId).subscribe({
        next: (success) => {
          if (success && this.movieId) {
            this.loadMovieActors(this.movieId);
          }
        },
        error: (error) => {
          console.error('Error al remover actor:', error);
          alert('Error al remover el actor');
        }
      });
    }
  }

  // Métodos auxiliares para validaciones
  isFieldInvalid(fieldName: string): boolean {
    const field = this.movieForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.movieForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    if (field?.hasError('pattern')) {
      return 'Debe ser una URL válida (http:// o https://)';
    }
    
    return '';
  }
}