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

  
  textoDeLugar(d: Destino): string {
    return [
      ` *${d.nombre}*`,
      `${d.ciudad}, ${d.departamento}`,
      ``,
      ` Cómo llegar: ${this.enlaceMapa(d)}`,
      ``,
      `Compartido desde Ruta1yRuta2 🇵🇾`,
    ].join('\n');
  }

  
  textoDeRuta(paradas: Destino[]): string {
    const lineas = paradas.map((d, i) => `${i + 1}. ${d.nombre} (${d.ciudad})`);
    return [
      ` *Mi ruta por Paraguay*`,
      ``,
      ...lineas,
      ``,
      ` Ver la ruta en Google Maps: ${this.enlaceRuta(paradas)}`,
      ``,
      `Armada con Ruta1yRuta2 🇵🇾`,
    ].join('\n');
  }

  
  enlaceMapa(d: Destino): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.consultaDe(d))}`;
  }

  
  enlaceRuta(paradas: Destino[]): string {
    const lugares = paradas.map((d) => this.consultaDe(d));
    const destino = lugares[lugares.length - 1];
    const intermedias = lugares.slice(0, -1);

    let url = `https://www.google.com/maps/dir/?api=1&travelmode=driving`;
    url += `&destination=${encodeURIComponent(destino)}`;
    if (intermedias.length > 0) {
      url += `&waypoints=${encodeURIComponent(intermedias.join('|'))}`;
    }
    return url;
  }

 
  private consultaDe(d: Destino): string {
    return d.lat !== undefined && d.lon !== undefined
      ? `${d.lat},${d.lon}`
      : `${d.nombre}, ${d.ciudad}, Paraguay`;
  }
}