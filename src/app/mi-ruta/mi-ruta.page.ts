import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonSpinner, IonText,
  IonList, IonItem, IonLabel, IonButton, IonIcon, IonBadge,
  IonReorderGroup, IonReorder, ItemReorderEventDetail,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
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

  // Los destinos completos, en el orden de la ruta
  paradas = computed(() =>
    this.ruta
      .paradas()
      .map((id) => this.destinos().find((d) => d.id === id))
      .filter((d): d is Destino => d !== undefined)
  );

  constructor() {
    addIcons({ trashOutline });
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

  // Se ejecuta cuando soltás un ítem en otra posición
  reordenar(event: CustomEvent<ItemReorderEventDetail>) {
    const nuevoOrden: Destino[] = event.detail.complete(this.paradas());
    this.ruta.reordenar(nuevoOrden.map((d) => d.id));
  }
}