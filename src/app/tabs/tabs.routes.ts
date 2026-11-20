import type { Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'explorar',
        loadComponent: () => import('../explorar/explorar.page').then((m) => m.ExplorarPage),
      },
      {
        path: 'mis-lugares',
        loadComponent: () => import('../mis-lugares/mis-lugares.page').then((m) => m.MisLugaresPage),
      },
      {
        path: 'mi-ruta',
        loadComponent: () => import('../mi-ruta/mi-ruta.page').then((m) => m.MiRutaPage),
      },
      {
        path: '',
        redirectTo: '/tabs/explorar',
        pathMatch: 'full',
      },
            {
        path: 'explorar/:id',
        loadComponent: () =>
          import('../destino-detalle/destino-detalle.page').then((m) => m.DestinoDetallePage),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/explorar',
    pathMatch: 'full',
  },
];
