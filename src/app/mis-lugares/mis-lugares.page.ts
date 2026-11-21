import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonSpinner, IonText,
  IonList, IonItem, IonLabel, IonButton, IonIcon, IonChip, IonBadge,
  IonSegment, IonSegmentButton,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline, checkmarkCircle, checkmarkCircleOutline } from 'ionicons/icons';
import { DestinosService } from '../services/destinos';
import { MisLugaresService } from '../services/mis-lugares';
import { Destino } from '../models/destino.model';

@Component({
  selector: 'app-mis-lugares',
  templateUrl: './mis-lugares.page.html',
  styleUrls: ['./mis-lugares.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonSpinner, IonText,
    IonList, IonItem, IonLabel, IonButton, IonIcon, IonChip, IonBadge,
    IonSegment, IonSegmentButton,
    CommonModule,
  ],
})
export class MisLugaresPage implements OnInit {
  private destinosService = inject(DestinosService);
  misLugares = inject(MisLugaresService);

  destinos = signal<Destino[]>([]);
  cargando = signal(true);
  error = signal('');
  vista = signal<'favoritos' | 'visitados'>('favoritos');

  // Destinos completos que están en cada lista
  favoritosLista = computed(() =>
    this.destinos().filter((d) => this.misLugares.esFavorito(d.id))
  );
  visitadosLista = computed(() =>
    this.destinos().filter((d) => this.misLugares.esVisitado(d.id))
  );
  pendientes = computed(() =>
    this.favoritosLista().filter((d) => !this.misLugares.esVisitado(d.id)).length
  );

  // La lista que se ve según el selector
  listaActual = computed(() =>
    this.vista() === 'favoritos' ? this.favoritosLista() : this.visitadosLista()
  );

  constructor() {
    addIcons({ trashOutline, checkmarkCircle, checkmarkCircleOutline });
  }

  ngOnInit() {
    this.destinosService.obtenerDestinos().subscribe({
      next: (destinos) => {
        this.destinos.set(destinos);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar destinos:', err);
        this.error.set('No se pudieron cargar tus lugares.');
        this.cargando.set(false);
      },
    });
  }

  cambiarVista(event: CustomEvent) {
    this.vista.set(event.detail.value);
  }
}