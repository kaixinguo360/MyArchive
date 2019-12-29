import { Component, Input } from '@angular/core';
import { ContentPreview } from '../content-preview';
import { INode } from '../../../service/file.service';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.css']
})
export class VideoPreviewComponent implements ContentPreview {
  @Input() node: INode;
  @Input() width: number;
  @Input() height: number;
  @Input() maxWidth: number;
  @Input() maxHeight: number;
  loading = true;
}
