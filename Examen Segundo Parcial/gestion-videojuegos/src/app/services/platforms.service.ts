import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Platform } from '../models/platform';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlatformsService {
  
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

  getPlatforms(): Observable<Platform[]> {
    return this.http.get<Platform[]>(`${this.apiUrl}/platforms?order=name.asc`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error al obtener la plataforma:', error);
        return of([]);
      })
    );
  }

  createPlatform(platform: Omit<Platform, 'id' | 'created_at'>): Observable<Platform | null> {
    return this.http.post<Platform[]>(`${this.apiUrl}/platforms`, platform, {
      headers: this.getHeaders()
    }).pipe(
      map(platforms => platforms && platforms.length > 0 ? platforms[0] : null),
      catchError(error => {
        console.error('Error al crear la plataforma:', error);
        return of(null);
      })
    );
  }

}
