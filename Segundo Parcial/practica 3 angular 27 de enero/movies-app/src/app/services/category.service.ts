import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class CategoryService {
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
 getCategories(): Observable<Category[]> {
 return this.http.get<Category[]>(
 `${this.apiUrl}/categories?order=name.asc`,
 { headers: this.getHeaders() }
 ).pipe(catchError(() => of([])));
 }
 createCategory(category: Omit<Category, 'id' | 'created_at'>): Observable<Category | null> {
 return this.http.post<Category[]>(
 `${this.apiUrl}/categories`, category,
 { headers: this.getHeaders() }
 ).pipe(
 map(categories => categories?.[0] || null),
 catchError(() => of(null))
 );
 }
}