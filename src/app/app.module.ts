import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatProgressBarModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './page/app.component';
import { CardComponent } from './com/card/card.component';

import { DirCardComponent } from './com/card/dir-card/dir-card.component';
import { FileCardComponent } from './com/card/file-card/file-card.component';
import { ImageCardComponent } from './com/card/image-card/image-card.component';
import { MasonryComponent } from './com/masonry/masonry.component';
import { CardFootComponent } from './com/card/card-foot/card-foot.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    DirCardComponent,
    FileCardComponent,
    ImageCardComponent,
    MasonryComponent,
    CardFootComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule
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
