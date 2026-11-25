import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonSpinner, IonText,
  IonList, IonItem, IonLabel, IonButton, IonIcon, IonBadge,
  IonReorderGroup, IonReorder, ItemReorderEventDetail,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline, navigateOutline, locateOutline, logoWhatsapp } from 'ionicons/icons';
import { DestinosService } from '../services/destinos';
import { RutaService } from '../services/ruta';
import { WikipediaService } from '../services/wikipedia';
import { UbicacionService, Punto } from '../services/ubicacion';
import { CompartirService } from '../services/compartir';
import { Destino } from '../models/destino.model';

@Component({
  selector: 'app-mi-ruta',
  templateUrl: './mi-ruta.page.html',
  styleUrls: ['./mi-ruta.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonSpinner, IonText,
    IonList, IonItem, IonLabel, IonButton, IonIcon, IonBadge,
    IonReorderGroup, IonReorder,
    CommonModule,
  ],
})
export class MiRutaPage implements OnInit {
  private destinosService = inject(DestinosService);
  private wikipediaService = inject(WikipediaService);
  private ubicacionService = inject(UbicacionService);
  private compartirService = inject(CompartirService);
  ruta = inject(RutaService);

  destinos = signal<Destino[]>([]);
  cargando = signal(true);
  error = signal('');
  ordenando = signal(false);
  mensajeOrden = signal('');

  paradas = computed(() =>
    this.ruta
      .paradas()
      .map((id) => this.destinos().find((d) => d.id === id))
      .filter((d): d is Destino => d !== undefined)
  );

  constructor() {
    addIcons({ trashOutline, navigateOutline, locateOutline, logoWhatsapp });
  }

  ngOnInit() {
    this.destinosService.obtenerDestinos().subscribe({
      next: (destinos) => {
        this.destinos.set(destinos);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar destinos:', err);
        this.error.set('No se pudo cargar tu ruta.');
        this.cargando.set(false);
      },
    });
  }

  reordenar(event: CustomEvent<ItemReorderEventDetail>) {
    const nuevoOrden: Destino[] = event.detail.complete(this.paradas());
    this.ruta.reordenar(nuevoOrden.map((d) => d.id));
  }

  async ordenarPorCercania() {
    const lista = this.paradas();
    if (lista.length < 2) {
      return;
    }

    this.ordenando.set(true);
    this.mensajeOrden.set('');

    try {
      const miUbicacion = await this.ubicacionService.obtenerUbicacion();

      const conCoordenadas: { destino: Destino; punto: Punto }[] = [];
      const sinCoordenadas: Destino[] = [];

      for (const d of lista) {
        const punto = await this.coordenadasDe(d);
        if (punto) {
          conCoordenadas.push({ destino: d, punto });
        } else {
          sinCoordenadas.push(d);
        }
      }

      const ordenados = this.ubicacionService.ordenarPorCercania(miUbicacion, conCoordenadas);
      const nuevoOrden = [
        ...ordenados.map((x) => x.destino.id),
        ...sinCoordenadas.map((d) => d.id),
      ];

      this.ruta.reordenar(nuevoOrden);
      this.mensajeOrden.set('✔ Ruta ordenada desde tu ubicación.');
    } catch (err) {
      console.warn('No se pudo obtener la ubicación:', err);
      this.mensajeOrden.set('No pudimos obtener tu ubicación. Revisá que el permiso de ubicación esté activado.');
    } finally {
      this.ordenando.set(false);
    }
  }

  compartirRutaPorWhatsApp() {
    const lista = this.paradas();
    if (lista.length === 0) {
      return;
    }
    this.compartirService.porWhatsApp(this.compartirService.textoDeRuta(lista));
  }

  abrirRutaEnGoogleMaps() {
    const lista = this.paradas();
    if (lista.length === 0) {
      return;
    }

    const lugares = lista.map((d) => this.textoDeLugar(d));
    const destino = lugares[lugares.length - 1];
    const intermedias = lugares.slice(0, -1);

    let url = `https://www.google.com/maps/dir/?api=1&travelmode=driving`;
    url += `&destination=${encodeURIComponent(destino)}`;

    if (intermedias.length > 0) {
      url += `&waypoints=${encodeURIComponent(intermedias.join('|'))}`;
    }

    window.open(url, '_blank');
  }

  private async coordenadasDe(d: Destino): Promise<Punto | undefined> {
    if (d.lat !== undefined && d.lon !== undefined) {
      return { lat: d.lat, lon: d.lon };
    }
    if (!d.wikiTitulo) {
      return undefined;
    }
    try {
      const resumen = await firstValueFrom(this.wikipediaService.obtenerResumen(d.wikiTitulo));
      return resumen.coordinates
        ? { lat: resumen.coordinates.lat, lon: resumen.coordinates.lon }
        : undefined;
    } catch {
      return undefined;
    }
  }

  private textoDeLugar(d: Destino): string {
    if (d.lat !== undefined && d.lon !== undefined) {
      return `${d.lat},${d.lon}`;
    }
    return `${d.nombre}, ${d.ciudad}, Paraguay`;
  }
}