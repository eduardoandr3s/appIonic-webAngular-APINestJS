import { Routes } from '@angular/router';
import {SeriesListComponent} from "./components/series-list/series-list.component";
import {SeriesEditComponent} from "./components/series-edit/series-edit.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'series/list',
    pathMatch: 'full',
  }, {
    path: 'series/list',
  component: SeriesListComponent
  }, {
    path: 'series/add',
  component: SeriesEditComponent
  }, {
    path: 'series/edit/:id',
  component: SeriesEditComponent
  },
];
