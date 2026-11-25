import {
  AfterViewInit, Component, ElementRef, OnDestroy,
  effect, inject, input, viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { Destino } from '../../models/destino.model';

@Component({
  selector: 'app-mapa-destinos',
  templateUrl: './mapa-destinos.html',
  styleUrls: ['./mapa-destinos.scss'],
})
export class MapaDestinos implements AfterViewInit, OnDestroy {
  private router = inject(Router);

  
  destinos = input<Destino[]>([]);

  
  private contenedor = viewChild.required<ElementRef<HTMLDivElement>>('contenedor');

  private mapa?: L.Map;
  private capaPines = L.layerGroup();

  
  private icono = L.icon({
    iconUrl: 'assets/leaflet/marker-icon.png',
    iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
    shadowUrl: 'assets/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  constructor() {
    
    effect(() => this.dibujarPines(this.destinos()));
  }

  ngAfterViewInit() {
 
    this.mapa = L.map(this.contenedor().nativeElement).setView([-23.4, -58.2], 6);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap',
    }).addTo(this.mapa);

    this.capaPines.addTo(this.mapa);

 
    setTimeout(() => {
      this.mapa?.invalidateSize();
      this.ajustarVista(this.destinos());
    }, 300);
  }

  ngOnDestroy() {
    this.mapa?.remove();
  }

  private dibujarPines(lista: Destino[]) {
    this.capaPines.clearLayers();
    for (const d of lista) {
      if (d.lat === undefined || d.lon === undefined) {
        continue;
      }
      L.marker([d.lat, d.lon], { icon: this.icono })
        .bindPopup(this.crearPopup(d))
        .addTo(this.capaPines);
    }
    this.ajustarVista(lista);
  }

 
  private crearPopup(d: Destino): HTMLElement {
    const contenido = document.createElement('div');

    const nombre = document.createElement('strong');
    nombre.textContent = d.nombre;

    const ubicacion = document.createElement('div');
    ubicacion.textContent = `${d.ciudad}, ${d.departamento}`;

    const boton = document.createElement('button');
    boton.textContent = 'Ver detalle';
    boton.className = 'boton-popup';
    boton.addEventListener('click', () => {
      this.router.navigate(['/tabs/explorar', d.id]);
    });

    contenido.append(nombre, ubicacion, boton);
    return contenido;
  }

 
  private ajustarVista(lista: Destino[]) {
    if (!this.mapa) {
      return;
    }
    const puntos: L.LatLngExpression[] = [];
    for (const d of lista) {
      if (d.lat !== undefined && d.lon !== undefined) {
        puntos.push([d.lat, d.lon]);
      }
    }
    if (puntos.length === 0) {
      return;
    }
    this.mapa.fitBounds(L.latLngBounds(puntos), { padding: [40, 40], maxZoom: 11 });
  }
}