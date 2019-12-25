import { Component, Input, OnInit } from '@angular/core';

import { INode } from '../../../service/file.service';
import { NodeCard } from '../card.component';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.css']
})
export class FileCardComponent implements NodeCard, OnInit {
  @Input() node: INode;

  constructor() { }

  ngOnInit() {
  }

}
