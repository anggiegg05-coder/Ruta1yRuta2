import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Destino } from '../models/destino.model';

@Injectable({
  providedIn: 'root',
})
export class DestinosService {
  private http = inject(HttpClient);

  obtenerDestinos(): Observable<Destino[]> {
    return this.http.get<Destino[]>(environment.destinosUrl);
  }
    obtenerDestinoPorId(id: string): Observable<Destino | undefined> {
    return this.obtenerDestinos().pipe(
      map((destinos) => destinos.find((d) => d.id === id))
    );
  }
}