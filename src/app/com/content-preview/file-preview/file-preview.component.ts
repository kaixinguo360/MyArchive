import { Component, Input } from '@angular/core';

import { INode } from '../../../service/file.service';
import { ContentPreview } from '../../card/card.component';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.css']
})
export class FilePreviewComponent implements ContentPreview {
  @Input() node: INode;
  @Input() width: number;
  @Input() height: number;
  @Input() maxWidth: number;
  @Input() maxHeight: number;
}
