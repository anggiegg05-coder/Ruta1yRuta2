import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonSpinner, IonChip, IonText,
} from '@ionic/angular';
import { DestinosService } from '../services/destinos';
import { Destino } from '../models/destino.model';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonSpinner, IonChip, IonText,
    CommonModule, FormsModule,
  ],
})
export class ExplorarPage implements OnInit {
  private destinosService = inject(DestinosService);
  destinos = signal<Destino[]>([]);
  cargando = signal(true);
  error = signal('');

  ngOnInit() {
    this.cargando.set(true);
    this.destinosService.obtenerDestinos().subscribe({
      next: (datos) => {
        this.destinos.set(datos);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar destinos:', err);
        this.error.set('No se pudieron cargar los destinos. Intentá de nuevo más tarde.');
        this.cargando.set(false);
      },
    });
  }
}