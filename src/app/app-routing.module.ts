import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DirComponent } from './page/dir/dir.component';

const routes: Routes = [
  { path: 'dir', component: DirComponent },
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
