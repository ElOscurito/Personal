import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Actor } from '../models/actor';
import { MovieActor } from '../models/movie-actor';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class MovieActorService {
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
 // Obtener actores de una película específica
 getActorsByMovie(movieId: string): Observable<Actor[]> {
 return this.http.get<any[]>(
 `${this.apiUrl}/movie_actors?movie_id=eq.${movieId}&select=*,actors(*)`,
 { headers: this.getHeaders() }
 ).pipe(
 map(results => results.map((r: any) => r.actors)),
 catchError(() => of([]))
 );
 }
 // Agregar un actor a una película
 addActorToMovie(movieId: string, actorId: string): Observable<MovieActor | null> {
 return this.http.post<MovieActor[]>(
 `${this.apiUrl}/movie_actors`,
 { movie_id: movieId, actor_id: actorId },
 { headers: this.getHeaders() }
 ).pipe(
 map(results => results?.[0] || null),
 catchError(() => of(null))
 );
 }
 // Remover un actor de una película
 removeActorFromMovie(movieId: string, actorId: string): Observable<boolean> {
 return this.http.delete(
 `${this.apiUrl}/movie_actors?movie_id=eq.${movieId}&actor_id=eq.${actorId}`,
 { headers: this.getHeaders() }
 ).pipe(
 map(() => true),
 catchError(() => of(false))
 );
 }
 // Remover todos los actores de una película
 removeAllActorsFromMovie(movieId: string): Observable<boolean> {
 return this.http.delete(
 `${this.apiUrl}/movie_actors?movie_id=eq.${movieId}`,
 { headers: this.getHeaders() }
 ).pipe(
 map(() => true),
 catchError(() => of(false))
 );
 }
}