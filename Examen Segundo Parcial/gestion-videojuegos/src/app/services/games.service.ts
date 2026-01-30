import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, map, tap } from 'rxjs';
import { Game, GameWithDetails } from '../models/game';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private apiUrl = environment.supabaseUrl;
  private apiKey = environment.supabaseKey;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'apikey': this.apiKey,
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    });
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/games?order=title.asc`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(error => {
        console.error('Error al obtener juegos:', error);
        return of([]);
      })
    );
  }

  getGamesWithDetails(): Observable<GameWithDetails[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/games?select=*,platforms(id,name),game_developers(developers(id,name))&order=title.asc`, 
      { headers: this.getHeaders() }
    ).pipe(
      map(games => games.map(game => ({
        ...game,
        platform: game.platforms,
        developers: game.developers?.map((gd: any) => gd.developers) || []
      }))),
      catchError(error => {
        console.error('Error al obtener juegos con detalles:', error);
        return of([]);
      })
    );
  }

  getGame(id: string): Observable<Game | null> {
    return this.http.get<Game[]>(`${this.apiUrl}/games?id=eq.${id}`, {
      headers: this.getHeaders()
    }).pipe(
      map(games => games && games.length > 0 ? games[0] : null),
      catchError(error => {
        console.error('Error al obtener el juego:', error);
        return of(null);
      })
    );
  }


  createGame(game: Omit<Game, 'id' | 'created_at'>): Observable<Game | null> {
    return this.http.post<Game[]>(`${this.apiUrl}/games`, game, {
      headers: this.getHeaders()
    }).pipe(
      map(games => games && games.length > 0 ? games[0] : null),
      catchError(error => {
        console.error('Error al añadir el juego:', error);
        return of(null);
      })
    );
  }

  updateGame(id: string, game: Partial<Game>): Observable<Game | null> {
    const { id: _, created_at, ...gameData } = game as Game;
    
    return this.http.patch<Game[]>(`${this.apiUrl}/games?id=eq.${id}`, gameData, {
      headers: this.getHeaders()
    }).pipe(
      map(games => games && games.length > 0 ? games[0] : null),
      catchError(error => {
        console.error('Error al actualizar el juego:', error);
        return of(null);
      })
    );
  }

  deleteGame(id: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/games?id=eq.${id}`, {
      headers: this.getHeaders()
    }).pipe(
      map(() => true),
      catchError(error => {
        console.error('Error al eliminar el juego:', error);
        return of(false);
      })
    );
  }

}
