import { TypeInfo } from '../app/service/node-resolver.service';
import { DirCardComponent } from '../app/com/card/dir-card/dir-card.component';
import { FileCardComponent } from '../app/com/card/file-card/file-card.component';
import { ImageCardComponent } from '../app/com/card/image-card/image-card.component';

export const TypeInfos: Map<string, TypeInfo> = new Map<string, TypeInfo>();

TypeInfos.set('default', {
  type: 'default',
  card: FileCardComponent,
});
TypeInfos.set('dir', {
  type: 'dir',
  card: DirCardComponent,
});
TypeInfos.set('img', {
  type: 'img',
  card: ImageCardComponent,
  ext: /jpg|jpeg|png|gif|bmp/
});

