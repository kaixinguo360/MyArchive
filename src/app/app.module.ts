import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { NgxMasonryModule } from 'ngx-masonry';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { ContentModule } from './content.module';

import { DirComponent } from './page/dir/dir.component';
import { CardComponent } from './com/card/card.component';
import { CardFootComponent } from './com/card/card-foot/card-foot.component';
import { MasonryComponent } from './com/masonry/masonry.component';
import { FileViewerComponent } from './com/file-viewer/file-viewer.component';
import { OrderSelectorComponent } from './com/order-selector/order-selector.component';

export class HammerConfig extends HammerGestureConfig  {
  buildHammer(element: HTMLElement) { return new Hammer(element, { touchAction: 'pan-y' }); }
}

@NgModule({
  declarations: [
    DirComponent,
    CardComponent,
    CardFootComponent,
    MasonryComponent,
    FileViewerComponent,
    OrderSelectorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    NgxMasonryModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ContentModule,
    MaterialModule,
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerConfig
  }],
  bootstrap: [ DirComponent ],
  entryComponents: [ FileViewerComponent ]
})
export class AppModule { }
