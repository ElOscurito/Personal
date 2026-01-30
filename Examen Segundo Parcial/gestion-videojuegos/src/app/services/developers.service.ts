import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { GameDevelopers } from '../models/game-developers';
import { environment } from '../../environments/environment';
import { Developer } from '../models/developer';

@Injectable({
  providedIn: 'root',
})
export class DevelopersService {
  
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

  getDevelopers(): Observable<Developer[]> {
    return this.http.get<Developer[]>(`${this.apiUrl}/developers?order=name.asc`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error al obtener desarrolladores:', error);
        return of([]);
      })
    );
  }

  createDeveloper(developer: Omit<Developer, 'id' | 'created_at'>): Observable<Developer | null> {
    return this.http.post<Developer[]>(`${this.apiUrl}/developers`, developer, {
      headers: this.getHeaders()
    }).pipe(
      map(developers => developers && developers.length > 0 ? developers[0] : null),
      catchError(error => {
        console.error('Error al crear el desarrollador:', error);
        return of(null);
      })
    );
  }

}
