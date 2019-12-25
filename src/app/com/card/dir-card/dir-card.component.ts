import { Component, Input, OnInit } from '@angular/core';

import { INode } from '../../../service/file.service';
import { CardContent } from '../card.component';

@Component({
  selector: 'app-dir-card',
  templateUrl: './dir-card.component.html',
  styleUrls: ['./dir-card.component.css']
})
export class DirCardComponent implements CardContent, OnInit {
  @Input() node: INode;

  constructor() { }

  ngOnInit() {
  }

}
