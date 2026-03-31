import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./neetcode/neetcode-home.component').then((m) => m.NeetcodeHomeComponent),
  },
];
