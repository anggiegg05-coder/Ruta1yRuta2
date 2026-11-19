import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-mi-ruta',
  templateUrl: './mi-ruta.page.html',
  styleUrls: ['./mi-ruta.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
})
export class MiRutaPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
