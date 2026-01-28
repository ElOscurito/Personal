// ============================================
// COMPONENTE ACTOR FORM - Seleccionar/Crear Actor
// ============================================
// Permite seleccionar un actor existente o crear uno nuevo
// Se navega aquí desde el formulario de películas

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ActorService } from '../../services/actor.service';
import { MovieActorService } from '../../services/movie-actor.service';
import { Actor } from '../../models/actor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './actor-form.component.html',
  styleUrl: './actor-form.component.css'
})
export class ActorFormComponent implements OnInit {
  actorForm: FormGroup;
  actors: Actor[] = [];
  movieId: string | null = null;
  submitting = false;
  loading = true;
  showNewActorForm = false;

  constructor(
    private fb: FormBuilder,
    private actorService: ActorService,
    private movieActorService: MovieActorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.actorForm = this.fb.group({
      selectedActorId: [''],
      newActorName: ['', [Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    // Obtener el ID de la película de los query params
    this.route.queryParams.subscribe(params => {
      this.movieId = params['movieId'];
    });

    // Cargar lista de actores existentes
    this.loadActors();
  }

  loadActors(): void {
    this.actorService.getActors().subscribe({
      next: (actors) => {
        this.actors = actors;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar actores:', error);
        this.loading = false;
      }
    });
  }

  toggleNewActorForm(): void {
    this.showNewActorForm = !this.showNewActorForm;
    if (this.showNewActorForm) {
      this.actorForm.patchValue({ selectedActorId: '' });
    } else {
      this.actorForm.patchValue({ newActorName: '' });
    }
  }

  onSubmit(): void {
    if (!this.movieId) {
      alert('Error: No se especificó la película');
      return;
    }

    this.submitting = true;

    if (this.showNewActorForm) {
      // Crear nuevo actor y agregarlo a la película
      const newActorName = this.actorForm.get('newActorName')?.value;
      
      if (!newActorName || newActorName.length < 2) {
        alert('Por favor ingresa un nombre válido para el actor');
        this.submitting = false;
        return;
      }

      this.actorService.createActor({ name: newActorName }).subscribe({
        next: (actor) => {
          if (actor) {
            this.addActorToMovie(actor.id);
          } else {
            alert('Error al crear el actor');
            this.submitting = false;
          }
        },
        error: (error) => {
          console.error('Error al crear actor:', error);
          alert('Error al crear el actor');
          this.submitting = false;
        }
      });
    } else {
      // Agregar actor existente a la película
      const actorId = this.actorForm.get('selectedActorId')?.value;
      
      if (!actorId) {
        alert('Por favor selecciona un actor');
        this.submitting = false;
        return;
      }

      this.addActorToMovie(actorId);
    }
  }

  addActorToMovie(actorId: string): void {
    if (!this.movieId) return;

    this.movieActorService.addActorToMovie(this.movieId, actorId).subscribe({
      next: (result) => {
        if (result) {
          console.log('Actor agregado a película');
          this.router.navigate(['/movies/edit', this.movieId]);
        } else {
          alert('Error al agregar el actor a la película');
          this.submitting = false;
        }
      },
      error: (error) => {
        console.error('Error al agregar actor a película:', error);
        alert('Error al agregar el actor a la película');
        this.submitting = false;
      }
    });
  }

  onCancel(): void {
    if (this.movieId) {
      this.router.navigate(['/movies/edit', this.movieId]);
    } else {
      this.router.navigate(['/movies']);
    }
  }
}