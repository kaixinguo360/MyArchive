import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './page/app.component';
import { CardComponent } from './com/card/card.component';

import { DirCardComponent } from './com/card/dir-card/dir-card.component';
import { FileCardComponent } from './com/card/file-card/file-card.component';
import { ImageCardComponent } from './com/card/image-card/image-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    DirCardComponent,
    FileCardComponent,
    ImageCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DirCardComponent,
    FileCardComponent,
    ImageCardComponent,
  ]
})
export class AppModule {
  constructor() {
  }
}
