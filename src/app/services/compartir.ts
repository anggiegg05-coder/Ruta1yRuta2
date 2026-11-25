import { Injectable } from '@angular/core';
import { Destino } from '../models/destino.model';

@Injectable({
  providedIn: 'root',
})
export class CompartirService {
  // Abre WhatsApp con el mensaje ya escrito
  porWhatsApp(texto: string) {
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  }

  // Mensaje para compartir un lugar
  textoDeLugar(d: Destino): string {
    return [
      `📍 *${d.nombre}*`,
      `${d.ciudad}, ${d.departamento}`,
      ``,
      `🗺️ Cómo llegar: ${this.enlaceMapa(d)}`,
      ``,
      `Compartido desde Ruta1yRuta2 🇵🇾`,
    ].join('\n');
  }

  // Enlace de Google Maps de un lugar (coordenadas si hay; si no, el nombre)
  enlaceMapa(d: Destino): string {
    const consulta =
      d.lat !== undefined && d.lon !== undefined
        ? `${d.lat},${d.lon}`
        : `${d.nombre}, ${d.ciudad}, Paraguay`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consulta)}`;
  }
}