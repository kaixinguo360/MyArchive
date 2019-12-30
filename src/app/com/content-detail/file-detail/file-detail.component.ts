import { Component, Input, OnInit } from '@angular/core';
import { INode } from '../../../service/file.service';
import { ContentDetail } from '../content-detail';
import { NodeResolver } from '../../../service/node-resolver.service';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements ContentDetail, OnInit {
  @Input() node: INode;
  icon: string;
  ext: string;

  ngOnInit(): void {
    const ext = this.node.name.trim().split('.').pop().toLowerCase();
    const info = this.nodeResolver.resolveExt(ext);
    this.icon = info.icon;
    this.ext = (info.name === 'Unknown File') ? ext : null;
  }

  constructor(
    private nodeResolver: NodeResolver
  ) { }
}
