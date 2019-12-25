import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './page/app.component';

const routes: Routes = [
  { path: 'dir', component: AppComponent },
  { path: '', redirectTo: '/dir', pathMatch: 'full' },
  { path: '**', redirectTo: '/dir', pathMatch: 'full' }
];

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
