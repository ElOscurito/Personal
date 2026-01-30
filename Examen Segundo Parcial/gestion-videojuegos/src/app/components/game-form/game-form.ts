import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { GamesService } from '../../services/games.service';
import { PlatformsService } from '../../services/platforms.service';
import { GameDevelopersService } from '../../services/game-developers.service';
import { Platform } from '../../models/platform';
import { Developer } from '../../models/developer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './game-form.html',
  styleUrl: './game-form.css',
})
export class GameForm implements OnInit {
  gameForm: FormGroup;
  platforms: Platform[] = [];
  gameDevelopers: Developer[] = [];
  isEditMode = false;
  gameId: string | null = null;
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private gameService: GamesService,
    private platformService: PlatformsService,
    private gameDeveloperService: GameDevelopersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.gameForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      platform_id: ['', [Validators.required]],
      cover: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    
    if (this.gameId) {
      this.isEditMode = true;
    }

    this.loadPlatforms();

    if (this.gameId) {
      this.loadGame(this.gameId);
      this.loadGameDevelopers(this.gameId);
    }
  }
  
  loadPlatforms(): void {
    this.platformService.getPlatforms().subscribe({
      next: (platforms) => {
        this.platforms = platforms;
      }
    });
  }

  loadGame(id: string): void {
    this.loading = true;
    
    this.gameService.getGame(id).subscribe({
      next: (game) => {
        if (game) {
          this.gameForm.patchValue({
            title: game.title,
            platform_id: game.platform_id,
            cover: game.cover,
            description: game.description
          });
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Error al cargar el videojuego');
        this.router.navigate(['/games']);
      }
    });
  }

  loadGameDevelopers(gameId: string): void {
    this.gameDeveloperService.getDevelopersByGame(gameId).subscribe({
      next: (developers) => {
        this.gameDevelopers = developers;
      }
    });
  }

  
  onSubmit(): void {
    if (this.gameForm.invalid) {
      Object.keys(this.gameForm.controls).forEach(key => {
        this.gameForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    const gameData = this.gameForm.value;

    if (this.isEditMode && this.gameId) {
      this.gameService.updateGame(this.gameId, gameData).subscribe({
        next: (result) => {
          if (result) {
            alert('Juego actualizada exitosamente');
            this.router.navigate(['/games']);
          }
          this.submitting = false;
        }
      });
    } else {
      this.gameService.createGame(gameData).subscribe({
        next: (result) => {
          if (result) {
            alert('Juego creado exitosamente');
            this.router.navigate(['/games']);
          }
          this.submitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/games']);
  }

  goToNewPlatform(): void {
    const currentUrl = this.router.url;
    this.router.navigate(['/platforms/new'], { 
      queryParams: { returnUrl: currentUrl } 
    });
  }

  goToAddDeveloper(): void {
    if (this.isEditMode && this.gameId) {
      this.router.navigate(['/developers/select'], { 
        queryParams: { gameId: this.gameId } 
      });
    } else {
      alert('Debes guardar el videojuego primero antes de agregar desarrolladores');
    }
  }

  removeDeveloper(developerId: string): void {
    if (!this.gameId) return;

    if (confirm('¿Estás seguro de remover este desarrollador del videojuego?')) {
      this.gameDeveloperService.removeDeveloperFromGame(this.gameId, developerId).subscribe({
        next: () => {
          if (this.gameId) {
            this.loadGameDevelopers(this.gameId);
          }
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.gameForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.gameForm.get(fieldName);
    
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
