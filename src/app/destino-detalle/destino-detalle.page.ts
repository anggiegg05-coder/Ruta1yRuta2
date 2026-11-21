import { Component, OnInit, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonSpinner, IonText, IonChip, IonList, IonItem, IonLabel,
  IonButton, IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  mapOutline, heart, heartOutline, checkmarkCircle, checkmarkCircleOutline,
  addCircleOutline, removeCircleOutline, // NUEVO
} from 'ionicons/icons';
import { DestinosService } from '../services/destinos';
import { WikipediaService } from '../services/wikipedia';
import { MisLugaresService } from '../services/mis-lugares';
import { RutaService } from '../services/ruta'; // NUEVO
import { Destino, WikiResumen } from '../models/destino.model';

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.page.html',
  styleUrls: ['./destino-detalle.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonSpinner, IonText, IonChip, IonList, IonItem, IonLabel,
    IonButton, IonIcon,
    CommonModule,
  ],
})
export class DestinoDetallePage implements OnInit {
  id = input<string>('');

  private destinosService = inject(DestinosService);
  private wikipediaService = inject(WikipediaService);
  misLugares = inject(MisLugaresService);
  ruta = inject(RutaService); // NUEVO

  destino = signal<Destino | undefined>(undefined);
  resumen = signal<WikiResumen | undefined>(undefined);
  cargando = signal(true);
  error = signal('');

  constructor() {
    addIcons({
      mapOutline, heart, heartOutline, checkmarkCircle, checkmarkCircleOutline,
      addCircleOutline, removeCircleOutline, // NUEVO
    });
  }

  ngOnInit() {
    this.destinosService.obtenerDestinoPorId(this.id()).subscribe({
      next: (destino) => {
        this.cargando.set(false);
        if (!destino) {
          this.error.set('No encontramos este destino.');
          return;
        }
        this.destino.set(destino);
        this.cargarResumen(destino);
      },
      error: (err) => {
        console.error('Error al cargar el destino:', err);
        this.error.set('No se pudo cargar el destino.');
        this.cargando.set(false);
      },
    });
  }

  abrirEnGoogleMaps() {
    const d = this.destino();
    if (!d) {
      return;
    }

    const coordenadas = this.resumen()?.coordinates;
    const consulta = coordenadas
      ? `${coordenadas.lat},${coordenadas.lon}`
      : `${d.nombre}, ${d.ciudad}, Paraguay`;

    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consulta)}`;
    window.open(url, '_blank');
  }

  private cargarResumen(destino: Destino) {
    if (!destino.wikiTitulo) {
      return;
    }
    this.wikipediaService.obtenerResumen(destino.wikiTitulo).subscribe({
      next: (resumen) => this.resumen.set(resumen),
      error: (err) => {
        console.warn('No se pudo cargar Wikipedia:', err);
        this.error.set('No se pudo cargar la información de Wikipedia.');
      },
    });
  }
}