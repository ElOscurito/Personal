import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from '../../services/games.service';
import { GameDevelopersService } from '../../services/game-developers.service';
import { Game, GameWithDetails } from '../../models/game';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-list',
  imports: [CommonModule],
  templateUrl: './game-list.html',
  styleUrl: './game-list.css',
})
export class GameListComponent implements OnInit {
  games: GameWithDetails[] = [];
  loading = true;

  constructor(
    private gameService: GamesService,
    private gameDeveloperService: GameDevelopersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.loading = true;
    
    this.gameService.getGamesWithDetails().subscribe({
      next: (games) => {
        this.games = games;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar videojuegos:', error);
        this.loading = false;
      }
    });
  }

  onEdit(gameId: string): void {
    this.router.navigate(['/games/edit', gameId]);
  }

  onDelete(gameId: string, gameTitle: string): void {
    if (confirm(`¿Estás seguro de eliminar el juego "${gameTitle}"?`)) {
      this.gameDeveloperService.removeAllDevelopersFromGame(gameId).subscribe({
        next: () => {
          this.gameService.deleteGame(gameId).subscribe({
            next: (success) => {
              if (success) {
                alert('Juego eliminado exitosamente');
                this.loadGames();
              } else {
                alert('Error al eliminar el juego');
              }
            }
          });
        }
      });
    }
  }

  onCreateNew(): void {
    this.router.navigate(['/games/new']);
  }

}
