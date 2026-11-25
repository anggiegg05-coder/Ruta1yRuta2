import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonSpinner, IonChip, IonText, IonSearchbar,
  IonItem, IonSelect, IonSelectOption, IonSegment, IonSegmentButton, IonLabel,
} from '@ionic/angular';
import { DestinosService } from '../services/destinos';
import { WikipediaService } from '../services/wikipedia';
import { Destino, WikiResumen } from '../models/destino.model';
import { MapaDestinos } from '../components/mapa-destinos/mapa-destinos';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonSpinner, IonChip, IonText, IonSearchbar,
    IonItem, IonSelect, IonSelectOption, IonSegment, IonSegmentButton, IonLabel,
    CommonModule, FormsModule, RouterLink, MapaDestinos,
  ],
})
export class ExplorarPage implements OnInit {
  private destinosService = inject(DestinosService);
  private wikipediaService = inject(WikipediaService);

  destinos = signal<Destino[]>([]);
  resumenes = signal<Record<string, WikiResumen>>({});
  cargando = signal(true);
  error = signal('');
  busqueda = signal('');
  departamentoSeleccionado = signal('todos');
  categoriaSeleccionada = signal('todas');
  vista = signal<'lista' | 'mapa'>('lista');

  departamentos = computed(() =>
    [...new Set(this.destinos().map((d) => d.departamento))].sort()
  );

  categorias = computed(() =>
    [...new Set(this.destinos().map((d) => d.categoria))].sort()
  );

  destinosFiltrados = computed(() => {
    const texto = this.normalizar(this.busqueda());
    const dep = this.departamentoSeleccionado();
    const cat = this.categoriaSeleccionada();

    return this.destinos().filter((destino) => {
      const coincideTexto =
        this.normalizar(destino.nombre).includes(texto) ||
        this.normalizar(destino.ciudad).includes(texto) ||
        this.normalizar(destino.departamento).includes(texto);
      const coincideDepartamento = dep === 'todos' || destino.departamento === dep;
      const coincideCategoria = cat === 'todas' || destino.categoria === cat;

      return coincideTexto && coincideDepartamento && coincideCategoria;
    });
  });

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

  buscar(evento: CustomEvent) {
    this.busqueda.set(evento.detail.value ?? '');
  }

  cambiarDepartamento(evento: CustomEvent) {
    this.departamentoSeleccionado.set(evento.detail.value);
  }

  cambiarCategoria(evento: CustomEvent) {
    this.categoriaSeleccionada.set(evento.detail.value);
  }

  cambiarVista(evento: CustomEvent) {
    this.vista.set(evento.detail.value);
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

  private normalizar(texto: string): string {
    return texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
}