import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AssignmentsComponent } from './pages/assignments/assignments.component';
import { ImportComponent } from './pages/import/import.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'assignments',
    component: AssignmentsComponent
  },
  {
    path: 'import',
    component: ImportComponent
  }
];