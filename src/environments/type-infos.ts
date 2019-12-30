import { TypeInfo } from '../app/service/node-resolver.service';
import { DirPreviewComponent } from '../app/com/content-preview/dir-preview/dir-preview.component';
import { FilePreviewComponent } from '../app/com/content-preview/file-preview/file-preview.component';
import { ImagePreviewComponent } from '../app/com/content-preview/image-preview/image-preview.component';
import { VideoPreviewComponent } from '../app/com/content-preview/video-preview/video-preview.component';
import { ImageDetailComponent } from '../app/com/content-detail/image-detail/image-detail.component';
import { VideoDetailComponent } from '../app/com/content-detail/video-detail/video-detail.component';

export const TypeInfos: Map<string, TypeInfo> = new Map<string, TypeInfo>();

TypeInfos.set('default', {
  name: 'Unknown File',
  id: 'file',
  preview: FilePreviewComponent,
  detail: FilePreviewComponent,
  icon: 'insert_drive_file',
});
TypeInfos.set('dir', {
  name: 'Directory',
  id: 'dir',
  preview: DirPreviewComponent,
  detail: DirPreviewComponent,
  icon: 'folder',
});
TypeInfos.set('img', {
  name: 'Image File',
  id: 'img',
  preview: ImagePreviewComponent,
  detail: ImageDetailComponent,
  icon: 'photo',
  ext: /jpg|jpeg|png|gif|bmp|webp/,
});
TypeInfos.set('video', {
  name: 'Video File',
  id: 'video',
  preview: VideoPreviewComponent,
  detail: VideoDetailComponent,
  icon: 'videocam',
  ext: /avi|rmvb|rm|asf|divx|mpg|mpeg|mpe|wmv|mp4|mkv|vob/,
});
