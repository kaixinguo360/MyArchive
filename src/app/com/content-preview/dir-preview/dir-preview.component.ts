import { Component, Input } from '@angular/core';

import { INode } from '../../../service/file.service';
import { ContentPreview } from '../../card/card.component';

@Component({
  selector: 'app-dir-card',
  templateUrl: './dir-preview.component.html',
  styleUrls: ['./dir-preview.component.css']
})
export class DirPreviewComponent implements ContentPreview {
  @Input() node: INode;
  @Input() width: number;
  @Input() height: number;
  @Input() maxWidth: number;
  @Input() maxHeight: number;
}
