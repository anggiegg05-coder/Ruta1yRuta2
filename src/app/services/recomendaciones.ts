import { Injectable } from '@angular/core';
import { Destino } from '../models/destino.model';

export interface Recomendacion {
  destino: Destino; 
  porque: Destino;  
  puntaje: number;
}

@Injectable({
  providedIn: 'root',
})
export class RecomendacionesService {
  recomendar(
    todos: Destino[],
    favoritosIds: string[],
    visitadosIds: string[],
    cantidad = 3
  ): Recomendacion[] {
    const meGustan = todos.filter((d) => favoritosIds.includes(d.id));
    if (meGustan.length === 0) {
      return [];
    }

    const candidatos = todos.filter(
      (d) => !favoritosIds.includes(d.id) && !visitadosIds.includes(d.id)
    );

    const recomendaciones: Recomendacion[] = [];

    for (const candidato of candidatos) {
      let mejor: Recomendacion | undefined;

      for (const gustado of meGustan) {
        const puntaje = this.parecido(candidato, gustado);
        if (puntaje > 0 && (!mejor || puntaje > mejor.puntaje)) {
          mejor = { destino: candidato, porque: gustado, puntaje };
        }
      }

      if (mejor) {
        recomendaciones.push(mejor);
      }
    }

    return recomendaciones
      .sort((a, b) => b.puntaje - a.puntaje)
      .slice(0, cantidad);
  }

 
  private parecido(a: Destino, b: Destino): number {
    let puntos = 0;
    if (a.categoria === b.categoria) {
      puntos += 2;
    }
    if (a.departamento === b.departamento) {
      puntos += 1;
    }
    return puntos;
  }
}