import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { DevelopersService } from '../../services/developers.service';
import { GameDevelopersService } from '../../services/game-developers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-developer-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './developer-form.html',
  styleUrl: './developer-form.css',
})
export class DeveloperForm implements OnInit {
  developerForm: FormGroup;
  developers: any[] = [];
  gameId: string | null = null;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private developerService: DevelopersService,
    private gameDeveloperService: GameDevelopersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.developerForm = this.fb.group({
      developer_id: [''],
      new_developer_name: ['']
    });
  }

  ngOnInit(): void {
    // Obtener el ID de la película de los query params
    this.route.queryParams.subscribe(params => {
      this.gameId = params['gameId'];
    });

    // Cargar lista de actores existentes
    this.loadDevelopers();
  }

  loadDevelopers(): void {
    this.developerService.getDevelopers().subscribe({
      next: (developers) => {
        this.developers = developers;
      }
    });
  }

  onSubmit(): void {
    if (!this.gameId) {
      alert('Error: No se especificó el juego');
      return;
    }

    const developerId = this.developerForm.get('developer_id')?.value;
    const newDeveloperName = this.developerForm.get('new_developer_name')?.value?.trim();

    if (!developerId && !newDeveloperName) {
      alert('Debes seleccionar un desarrollador o crear uno nuevo');
      return;
    }

    this.submitting = true;

    if (developerId) {
      // Agregar desarrollador existente
      this.gameDeveloperService.addDeveloperToGame(this.gameId, developerId).subscribe({
        next: (result) => {
          if (result) {
            alert('Desarrollador agregado exitosamente');
            this.router.navigate(['/games/edit', this.gameId]);
          }
          this.submitting = false;
        }
      });
    } else if (newDeveloperName) {
      // Crear nuevo actor y agregarlo
      this.developerService.createDeveloper({ name: newDeveloperName }).subscribe({
        next: (newDeveloper) => {
          if (newDeveloper) {
            this.gameDeveloperService.addDeveloperToGame(this.gameId, newDeveloper.id).subscribe({
              next: (result) => {
                if (result) {
                  alert('Desarrollador creado y agregado exitosamente');
                  this.router.navigate(['/games/edit', this.gameId]);
                }
                this.submitting = false;
              }
            });
          } else {
            alert('Error al crear el desarrollador');
            this.submitting = false;
          }
        }
      });
    }
  }

  onCancel(): void {
    if (this.gameId) {
      this.router.navigate(['/games/edit', this.gameId]);
    } else {
      this.router.navigate(['/games']);
    }
  }

}
