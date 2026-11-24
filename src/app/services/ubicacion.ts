import { Injectable } from '@angular/core';


export interface Punto {
  lat: number;
  lon: number;
}

@Injectable({
  providedIn: 'root',
})
export class UbicacionService {
  // Pide la ubicación actual al navegador o al celular
  obtenerUbicacion(): Promise<Punto> {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error('Este dispositivo no permite obtener la ubicación.'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        (err) => reject(err),
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 }
      );
    });
  }

 
  distanciaKm(a: Punto, b: Punto): number {
    const radioTierra = 6371;
    const rad = (grados: number) => (grados * Math.PI) / 180;
    const dLat = rad(b.lat - a.lat);
    const dLon = rad(b.lon - a.lon);
    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
    return 2 * radioTierra * Math.asin(Math.sqrt(h));
  }

 
  ordenarPorCercania<T extends { punto: Punto }>(origen: Punto, items: T[]): T[] {
    const pendientes = [...items];
    const resultado: T[] = [];
    let actual = origen;

    while (pendientes.length > 0) {
      let indiceMasCercano = 0;
      let menorDistancia = Infinity;

      pendientes.forEach((item, i) => {
        const distancia = this.distanciaKm(actual, item.punto);
        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          indiceMasCercano = i;
        }
      });

      const [elegido] = pendientes.splice(indiceMasCercano, 1);
      resultado.push(elegido);
      actual = elegido.punto;
    }

    return resultado;
  }
}