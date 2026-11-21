import { Injectable, signal } from '@angular/core';

const CLAVE_FAVORITOS = 'ruta1yruta2_favoritos';

@Injectable({
  providedIn: 'root',
})
export class MisLugaresService {
  favoritos = signal<string[]>(this.leer(CLAVE_FAVORITOS));

  esFavorito(id: string): boolean {
    return this.favoritos().includes(id);
  }

  alternarFavorito(id: string) {
    this.favoritos.update((lista) =>
      lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id]
    );
    this.guardar(CLAVE_FAVORITOS, this.favoritos());
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