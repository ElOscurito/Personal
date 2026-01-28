import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Actor } from '../models/actor';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class ActorService {
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
 getActors(): Observable<Actor[]> {
 return this.http.get<Actor[]>(
 `${this.apiUrl}/actors?order=name.asc`,
 { headers: this.getHeaders() }
 ).pipe(catchError(() => of([])));
 }
 createActor(actor: Omit<Actor, 'id' | 'created_at'>): Observable<Actor | null> {
 return this.http.post<Actor[]>(
 `${this.apiUrl}/actors`, actor,
 { headers: this.getHeaders() }
 ).pipe(
 map(actors => actors?.[0] || null),
 catchError(() => of(null))
 );
 }
}