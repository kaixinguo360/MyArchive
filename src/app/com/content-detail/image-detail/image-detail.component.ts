import { Component, Input, OnInit } from '@angular/core';

import { INode } from '../../../service/file.service';
import { ContentDetail } from '../content-detail';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements ContentDetail, OnInit {
  @Input() node: INode;
  loading = true;
  error = false;
  isGIF = false;
  zoom = false;

  ngOnInit(): void {
    this.isGIF = 'gif' === this.node.name.trim().split('.').pop().toLowerCase();
  }
}
