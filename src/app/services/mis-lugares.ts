import { Injectable, WritableSignal, signal } from '@angular/core';

const CLAVE_FAVORITOS = 'ruta1yruta2_favoritos';
const CLAVE_VISITADOS = 'ruta1yruta2_visitados';

@Injectable({
  providedIn: 'root',
})
export class MisLugaresService {
  favoritos = signal<string[]>(this.leer(CLAVE_FAVORITOS));
  visitados = signal<string[]>(this.leer(CLAVE_VISITADOS));

  esFavorito(id: string): boolean {
    return this.favoritos().includes(id);
  }

  alternarFavorito(id: string) {
    this.alternar(this.favoritos, CLAVE_FAVORITOS, id);
  }

  esVisitado(id: string): boolean {
    return this.visitados().includes(id);
  }

  alternarVisitado(id: string) {
    this.alternar(this.visitados, CLAVE_VISITADOS, id);
  }

  // Agrega el id si no está, o lo quita si ya está, y guarda
  private alternar(lista: WritableSignal<string[]>, clave: string, id: string) {
    lista.update((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
    );
    this.guardar(clave, lista());
  }

  private leer(clave: string): string[] {
    try {
      const texto = localStorage.getItem(clave);
      return texto ? JSON.parse(texto) : [];
    } catch {
      return [];
    }
  }

  private guardar(clave: string, valor: string[]) {
    localStorage.setItem(clave, JSON.stringify(valor));
  }
}