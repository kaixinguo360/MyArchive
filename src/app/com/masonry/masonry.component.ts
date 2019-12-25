import { Component, Input, OnInit } from '@angular/core';
import { INode } from '../../service/file.service';

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.css']
})
export class MasonryComponent implements OnInit {
  @Input() nodes: INode[];

  constructor() { }

  ngOnInit() {
  }

}
