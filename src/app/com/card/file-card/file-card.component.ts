import { Component, Input, OnInit } from '@angular/core';

import { INode } from '../../../service/file.service';
import { CardContent } from '../card.component';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.css']
})
export class FileCardComponent implements CardContent, OnInit {
  @Input() node: INode;

  constructor() { }

  ngOnInit() {
  }

}
