import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { DestinosService } from '../services/destinos';
import { Destino } from '../models/destino.model';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
})
export class ExplorarPage implements OnInit {
  private destinosService = inject(DestinosService);
  destinos: Destino[] = [];

  ngOnInit() {
    this.destinosService.obtenerDestinos().subscribe({
      next: (datos) => {
        this.destinos = datos;
        console.log('Destinos cargados:', datos);
      },
      error: (err) => {
        console.error('Error al cargar destinos:', err);
      },
    });
  }
}