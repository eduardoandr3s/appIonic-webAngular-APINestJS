import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },

  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then( m => m.TabsPage),
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
      {
        path: 'inicio',
        loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage)
      }
      ,
      {
        path: 'categoria',
        loadComponent: () => import('./pages/categoria/categoria.page').then( m => m.CategoriaPage)
      },
      {
        path: 'categories/:id',
        loadComponent: () => import('./pages/categoria/categoria.page').then( m => m.CategoriaPage)
      },
      {
        path: 'buscador',
        loadComponent: () => import('./pages/buscador/buscador.page').then( m => m.BuscadorPage)
      } ,
      {
        path: 'detalle/:id',
        loadComponent: () => import('./pages/detalle/detalle.page').then( m => m.DetallePage)
      }
    ]
  },



];
