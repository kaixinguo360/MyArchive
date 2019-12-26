import {Component, Input, OnChanges, OnInit} from '@angular/core';

import { INode } from '../../../service/file.service';
import { CardContent } from '../card.component';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.css']
})
export class FileCardComponent implements CardContent {
  @Input() node: INode;
  @Input() width: number;
  @Input() height: number;
  @Input() maxWidth: number;
  @Input() maxHeight: number;
}
