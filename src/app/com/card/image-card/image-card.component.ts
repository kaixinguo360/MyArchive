import { Component, Input, OnInit } from '@angular/core';

import { INode } from '../../../service/file.service';
import { CardContent } from '../card.component';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent implements CardContent, OnInit {
  @Input() node: INode;
  @Input() width: number;
  @Input() height: number;
  @Input() maxWidth: number;
  @Input() maxHeight: number;

  constructor() { }
  ngOnInit() { }

}
