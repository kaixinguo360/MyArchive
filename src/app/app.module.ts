import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatMenuModule, MatProgressBarModule, MatSnackBarModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { DirComponent } from './page/dir/dir.component';
import { CardFootComponent } from './com/card/card-foot/card-foot.component';
import { CardComponent } from './com/card/card.component';
import { MasonryComponent } from './com/masonry/masonry.component';
import { FileViewerComponent } from './com/file-viewer/file-viewer.component';

import { DirPreviewComponent } from './com/content-preview/dir-preview/dir-preview.component';
import { FilePreviewComponent } from './com/content-preview/file-preview/file-preview.component';
import { ImagePreviewComponent } from './com/content-preview/image-preview/image-preview.component';
import { FileDetailComponent } from './com/content-detail/file-detail/file-detail.component';
import { OrderSelectorComponent } from './com/order-selector/order-selector.component';

export class MyHammerConfig extends HammerGestureConfig  {
  buildHammer(element: HTMLElement) {
    return new Hammer(element, {
      touchAction: 'pan-y'
    });
  }
}

@NgModule({
  declarations: [
    DirComponent,
    CardComponent,
    CardFootComponent,
    MasonryComponent,
    FileViewerComponent,
    DirPreviewComponent,
    FilePreviewComponent,
    ImagePreviewComponent,
    FileDetailComponent,
    OrderSelectorComponent,
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
    MatProgressBarModule,
    MatMenuModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  }],
  bootstrap: [DirComponent],
  entryComponents: [
    FileViewerComponent,
    DirPreviewComponent,
    FilePreviewComponent,
    ImagePreviewComponent,
    FileDetailComponent,
  ]
})
export class AppModule {
  constructor() {
  }
}
