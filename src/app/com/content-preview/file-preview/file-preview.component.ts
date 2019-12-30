import { Component, Input, OnInit } from '@angular/core';
import { ContentPreview } from '../content-preview';
import { INode } from '../../../service/file.service';
import { NodeResolver } from '../../../service/node-resolver.service';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.css']
})
export class FilePreviewComponent implements ContentPreview, OnInit {
  @Input() node: INode;
  @Input() width: number;
  @Input() height: number;
  @Input() maxWidth: number;
  @Input() maxHeight: number;
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

