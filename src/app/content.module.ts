import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { DirPreviewComponent } from './com/content-preview/dir-preview/dir-preview.component';
import { FilePreviewComponent } from './com/content-preview/file-preview/file-preview.component';
import { ImagePreviewComponent } from './com/content-preview/image-preview/image-preview.component';
import { VideoPreviewComponent } from './com/content-preview/video-preview/video-preview.component';
import { FileDetailComponent } from './com/content-detail/file-detail/file-detail.component';
import { VideoDetailComponent } from './com/content-detail/video-detail/video-detail.component';
import { ImageDetailComponent } from './com/content-detail/image-detail/image-detail.component';

@NgModule({
  declarations: [
    DirPreviewComponent,
    FilePreviewComponent,
    ImagePreviewComponent,
    VideoPreviewComponent,
    FileDetailComponent,
    ImageDetailComponent,
    VideoDetailComponent,
  ],
  entryComponents: [
    DirPreviewComponent,
    FilePreviewComponent,
    ImagePreviewComponent,
    VideoPreviewComponent,
    FileDetailComponent,
    ImageDetailComponent,
    VideoDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LazyLoadImageModule,
  ],
})
export class ContentModule { }
