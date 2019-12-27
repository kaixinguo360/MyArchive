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
import { DirComponent } from './page/dir/dir.component';
import { FileComponent } from './page/file/file.component';
import { MasonryComponent } from './com/masonry/masonry.component';

import { DirPreviewComponent } from './com/content-preview/dir-preview/dir-preview.component';
import { FilePreviewComponent } from './com/content-preview/file-preview/file-preview.component';
import { ImagePreviewComponent } from './com/content-preview/image-preview/image-preview.component';
import { CardFootComponent } from './com/card/card-foot/card-foot.component';
import { CardComponent } from './com/card/card.component';

@NgModule({
  declarations: [
    DirComponent,
    CardComponent,
    DirPreviewComponent,
    FilePreviewComponent,
    ImagePreviewComponent,
    MasonryComponent,
    CardFootComponent,
    FileComponent,
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
  bootstrap: [DirComponent],
  entryComponents: [
    DirPreviewComponent,
    FilePreviewComponent,
    ImagePreviewComponent,
  ]
})
export class AppModule {
  constructor() {
  }
}
