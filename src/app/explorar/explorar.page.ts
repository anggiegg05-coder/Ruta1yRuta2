import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonSpinner, IonChip, IonText, IonImg,
} from '@ionic/angular';
import { DestinosService } from '../services/destinos';
import { WikipediaService } from '../services/wikipedia';
import { Destino, WikiResumen } from '../models/destino.model';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonSpinner, IonChip, IonText, IonImg,
    CommonModule, FormsModule,
  ],
})
export class ExplorarPage implements OnInit {
  private destinosService = inject(DestinosService);
  private wikipediaService = inject(WikipediaService);

  destinos = signal<Destino[]>([]);
  resumenes = signal<Record<string, WikiResumen>>({});
  cargando = signal(true);
  error = signal('');

  ngOnInit() {
    this.cargando.set(true);
    this.destinosService.obtenerDestinos().subscribe({
      next: (datos) => {
        this.destinos.set(datos);
        this.cargando.set(false);
        this.cargarResumenes(datos);
      },
      error: (err) => {
        console.error('Error al cargar destinos:', err);
        this.error.set('No se pudieron cargar los destinos. Intentá de nuevo más tarde.');
        this.cargando.set(false);
      },
    });
  }

  private cargarResumenes(destinos: Destino[]) {
    for (const destino of destinos) {
      if (!destino.wikiTitulo) {
        continue;
      }
      this.wikipediaService.obtenerResumen(destino.wikiTitulo).subscribe({
        next: (resumen) => {
          this.resumenes.update((actual) => ({ ...actual, [destino.id]: resumen }));
        },
        error: (err) => {
          console.warn('No se pudo cargar Wikipedia para', destino.nombre, err);
        },
      });
    }
  }
}