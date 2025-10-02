import { Routes } from '@angular/router';  

export const routes: Routes = [  
  { path: '', redirectTo: '/demo', pathMatch: 'full' },  
  { path: 'demo', loadComponent: () => import('./pages/grid-demo/grid-demo.component').then(m => m.GridDemoComponent) },  
  { path: '**', redirectTo: '/demo' }  
]; 