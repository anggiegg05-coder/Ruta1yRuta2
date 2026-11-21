import { Injectable, signal } from '@angular/core';

const CLAVE_RUTA = 'ruta1yruta2_ruta';

@Injectable({
  providedIn: 'root',
})
export class RutaService {
  paradas = signal<string[]>(this.leer());

  estaEnRuta(id: string): boolean {
    return this.paradas().includes(id);
  }

  agregar(id: string) {
    if (this.estaEnRuta(id)) {
      return;
    }
    this.paradas.update((lista) => [...lista, id]);
    this.guardar();
  }

  quitar(id: string) {
    this.paradas.update((lista) => lista.filter((x) => x !== id));
    this.guardar();
  }

  alternar(id: string) {
    if (this.estaEnRuta(id)) {
      this.quitar(id);
    } else {
      this.agregar(id);
    }
  }

  reordenar(nuevoOrden: string[]) {
    this.paradas.set(nuevoOrden);
    this.guardar();
  }

  private leer(): string[] {
    try {
      const texto = localStorage.getItem(CLAVE_RUTA);
      return texto ? JSON.parse(texto) : [];
    } catch {
      return [];
    }
  }

  private guardar() {
    localStorage.setItem(CLAVE_RUTA, JSON.stringify(this.paradas()));
  }
}