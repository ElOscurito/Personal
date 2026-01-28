// ============================================
// SERVICIO DE PELÍCULAS - CRUD COMPLETO
// ============================================
// Este servicio maneja todas las operaciones CRUD
// para las películas, incluyendo su relación con categorías

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap, map } from 'rxjs';
import { Movie, MovieWithDetails } from '../models/movie';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = environment.supabaseUrl;
  private apiKey = environment.supabaseKey;

  constructor(private http: HttpClient) {}

  // ============================================
  // HEADERS PRIVADOS
  // ============================================
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'apikey': this.apiKey,
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    });
  }

  // ============================================
  // READ - Obtener todas las películas
  // ============================================
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies?order=title.asc`, { 
      headers: this.getHeaders() 
    }).pipe(
      tap(movies => console.log('Películas obtenidas:', movies.length)),
      catchError(error => {
        console.error('Error al obtener películas:', error);
        return of([]);
      })
    );
  }

  // ============================================
  // READ - Obtener películas con detalles completos
  // ============================================
  // Incluye información de categoría y actores usando "embedding"
  getMoviesWithDetails(): Observable<MovieWithDetails[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/movies?select=*,categories(id,name),movie_actors(actors(id,name))&order=title.asc`, 
      { headers: this.getHeaders() }
    ).pipe(
      map(movies => movies.map(movie => ({
        ...movie,
        category: movie.categories,
        actors: movie.movie_actors?.map((ma: any) => ma.actors) || []
      }))),
      tap(movies => console.log('Películas con detalles obtenidas:', movies.length)),
      catchError(error => {
        console.error('Error al obtener películas con detalles:', error);
        return of([]);
      })
    );
  }

  // ============================================
  // READ - Obtener una película por ID
  // ============================================
  getMovie(id: string): Observable<Movie | null> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies?id=eq.${id}`, {
      headers: this.getHeaders()
    }).pipe(
      map(movies => movies && movies.length > 0 ? movies[0] : null),
      tap(movie => console.log('Película obtenida:', movie)),
      catchError(error => {
        console.error('Error al obtener película:', error);
        return of(null);
      })
    );
  }

  // ============================================
  // CREATE - Crear una nueva película
  // ============================================
  createMovie(movie: Omit<Movie, 'id' | 'created_at'>): Observable<Movie | null> {
    return this.http.post<Movie[]>(`${this.apiUrl}/movies`, movie, {
      headers: this.getHeaders()
    }).pipe(
      map(movies => movies && movies.length > 0 ? movies[0] : null),
      tap(result => console.log('Película creada:', result)),
      catchError(error => {
        console.error('Error al crear película:', error);
        return of(null);
      })
    );
  }

  // ============================================
  // UPDATE - Actualizar una película existente
  // ============================================
  updateMovie(id: string, movie: Partial<Movie>): Observable<Movie | null> {
    const { id: _, created_at, ...movieData } = movie as Movie;
    
    return this.http.patch<Movie[]>(`${this.apiUrl}/movies?id=eq.${id}`, movieData, {
      headers: this.getHeaders()
    }).pipe(
      map(movies => movies && movies.length > 0 ? movies[0] : null),
      tap(result => console.log('Película actualizada:', result)),
      catchError(error => {
        console.error('Error al actualizar película:', error);
        return of(null);
      })
    );
  }

  // ============================================
  // DELETE - Eliminar una película
  // ============================================
  deleteMovie(id: string): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/movies?id=eq.${id}`, {
      headers: this.getHeaders()
    }).pipe(
      map(() => true),
      tap(() => console.log('Película eliminada:', id)),
      catchError(error => {
        console.error('Error al eliminar película:', error);
        return of(false);
      })
    );
  }
}