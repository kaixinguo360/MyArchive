import { TypeInfo } from '../app/service/node-resolver.service';
import { DirCardComponent } from '../app/com/card/dir-card/dir-card.component';
import { FileCardComponent } from '../app/com/card/file-card/file-card.component';
import { ImageCardComponent } from '../app/com/card/image-card/image-card.component';

export const TypeInfos: Map<string, TypeInfo> = new Map<string, TypeInfo>();

TypeInfos.set('default', {
  name: 'Unknown File',
  cardContent: FileCardComponent,
  icon: 'insert_drive_file',
});
TypeInfos.set('dir', {
  name: 'Directory',
  cardContent: DirCardComponent,
  icon: 'folder',
});
TypeInfos.set('img', {
  name: 'Image File',
  cardContent: ImageCardComponent,
  icon: 'photo',
  ext: /jpg|jpeg|png|gif|bmp|webp/,
});

