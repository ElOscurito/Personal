import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Developer } from '../models/developer';
import { GameDevelopers } from '../models/game-developers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameDevelopersService {

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

  getDevelopersByGame(gameId: string): Observable<Developer[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/game_developers?game_id=eq.${gameId}&select=*,developers(*)`,
      { headers: this.getHeaders() }
    ).pipe(
      map(results => results.map((r: any) => r.developers)),
      catchError(error => {
        console.error('Error al obtener a los desarrolladores del juego:', error);
        return of([]);
      })
    );
  }

  addDeveloperToGame(gameId: string, developerId: string): Observable<GameDevelopers | null> {
    return this.http.post<GameDevelopers[]>(
      `${this.apiUrl}/game_developers`,
      { game_id: gameId, developer_id: developerId },
      { headers: this.getHeaders() }
    ).pipe(
      map(results => results && results.length > 0 ? results[0] : null),
      catchError(error => {
        console.error('Error al agregar al desarrollador al juego:', error);
        return of(null);
      })
    );
  }

  removeDeveloperFromGame(gameId: string, developerId: string): Observable<boolean> {
    return this.http.delete(
      `${this.apiUrl}/game_developers?game_id=eq.${gameId}&developer_id=eq.${developerId}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(() => true),
      catchError(error => {
        console.error('Error al remover actor al desarrollador del juego:', error);
        return of(false);
      })
    );
  }

  removeAllDevelopersFromGame(gameId: string): Observable<boolean> {
    return this.http.delete(
      `${this.apiUrl}/game_developers?game_id=eq.${gameId}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(() => true),
      catchError(error => {
        console.error('Error al remover desarolladores de la pelicula:', error);
        return of(false);
      })
    );
  }
  
}
