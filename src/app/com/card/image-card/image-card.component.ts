import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { INode } from '../../../service/file.service';
import { CardContent } from '../card.component';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent implements CardContent {
  @Input() node: INode;
  @Input() width: number;
  @Input() height: number;
  @Input() maxWidth: number;
  @Input() maxHeight: number;
  overflow = false;
  @ViewChild('img', { static: true }) imgRef: ElementRef;
  @ViewChild('container', { static: true }) containerRef: ElementRef;

  onload(): void {
    this.overflow = this.imgRef.nativeElement.offsetHeight > this.containerRef.nativeElement.offsetHeight;
  }
}
