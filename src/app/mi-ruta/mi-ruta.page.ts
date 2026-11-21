import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonSpinner, IonText,
  IonList, IonItem, IonLabel, IonButton, IonIcon, IonBadge,
  IonReorderGroup, IonReorder, ItemReorderEventDetail,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline, navigateOutline } from 'ionicons/icons'; // NUEVO: navigateOutline
import { DestinosService } from '../services/destinos';
import { RutaService } from '../services/ruta';
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
  ruta = inject(RutaService);

  destinos = signal<Destino[]>([]);
  cargando = signal(true);
  error = signal('');

  paradas = computed(() =>
    this.ruta
      .paradas()
      .map((id) => this.destinos().find((d) => d.id === id))
      .filter((d): d is Destino => d !== undefined)
  );

  constructor() {
    addIcons({ trashOutline, navigateOutline }); // NUEVO: navigateOutline
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

  abrirRutaEnGoogleMaps() {
    const lista = this.paradas();
    if (lista.length === 0) {
      return;
    }

    const lugares = lista.map((d) => this.textoDeLugar(d));
    const destino = lugares[lugares.length - 1];

    let url = `https://www.google.com/maps/dir/?api=1&travelmode=driving`;
    url += `&destination=${encodeURIComponent(destino)}`;

    if (lugares.length > 1) {
      const origen = lugares[0];
      const intermedias = lugares.slice(1, -1);
      url += `&origin=${encodeURIComponent(origen)}`;
      if (intermedias.length > 0) {
        url += `&waypoints=${encodeURIComponent(intermedias.join('|'))}`;
      }
    }

    window.open(url, '_blank');
  }

    private textoDeLugar(d: Destino): string {
    return `${d.nombre}, ${d.ciudad}, Paraguay`;
  }
}