import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { WikiResumen } from '../models/destino.model';

@Injectable({
  providedIn: 'root',
})
export class WikipediaService {
  private http = inject(HttpClient);

  obtenerResumen(titulo: string): Observable<WikiResumen> {
    const url = environment.wikipediaApiUrl + encodeURIComponent(titulo);
    return this.http.get<WikiResumen>(url);
  }
}