import { TypeInfo } from './service/node-resolver.service';
import { DirPreviewComponent } from './com/content-preview/dir-preview/dir-preview.component';
import { FilePreviewComponent } from './com/content-preview/file-preview/file-preview.component';
import { ImagePreviewComponent } from './com/content-preview/image-preview/image-preview.component';
import { VideoPreviewComponent } from './com/content-preview/video-preview/video-preview.component';
import { FileDetailComponent } from './com/content-detail/file-detail/file-detail.component';
import { ImageDetailComponent } from './com/content-detail/image-detail/image-detail.component';
import { VideoDetailComponent } from './com/content-detail/video-detail/video-detail.component';

export const TypeInfos: Map<string, TypeInfo> = new Map<string, TypeInfo>();

TypeInfos.set('default', {
  name: 'Unknown File',
  id: 'file',
  preview: FilePreviewComponent,
  detail: FileDetailComponent,
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
  icon: 'image',
  ext: /^(jpg|jpeg|jfif|pjpeg|pjp|png|gif|bmp|webp|apng|ico|cur|svg)$/,
});
TypeInfos.set('video', {
  name: 'Video File',
  id: 'video',
  preview: VideoPreviewComponent,
  detail: VideoDetailComponent,
  icon: 'videocam',
  ext: /^(3g2|3gp|avi|flv|h264|m4v|mkv|mov|mp4|mpg|rm|vob|wmv|rmvb|asf|divx|mpeg|mpe)$/,
});
