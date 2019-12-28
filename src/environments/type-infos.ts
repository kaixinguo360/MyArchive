import { TypeInfo } from '../app/service/node-resolver.service';
import { DirPreviewComponent } from '../app/com/content-preview/dir-preview/dir-preview.component';
import { FilePreviewComponent } from '../app/com/content-preview/file-preview/file-preview.component';
import { ImagePreviewComponent } from '../app/com/content-preview/image-preview/image-preview.component';

export const TypeInfos: Map<string, TypeInfo> = new Map<string, TypeInfo>();

TypeInfos.set('default', {
  name: 'Unknown File',
  preview: FilePreviewComponent,
  detail: FilePreviewComponent,
  icon: 'insert_drive_file',
});
TypeInfos.set('dir', {
  name: 'Directory',
  preview: DirPreviewComponent,
  detail: DirPreviewComponent,
  icon: 'folder',
});
TypeInfos.set('img', {
  name: 'Image File',
  preview: ImagePreviewComponent,
  detail: ImagePreviewComponent,
  icon: 'photo',
  ext: /jpg|jpeg|png|gif|bmp|webp/,
});

