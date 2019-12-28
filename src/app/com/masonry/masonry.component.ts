import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { INode } from '../../service/file.service';
import { FileViewer } from '../file-viewer/file-viewer.component';

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.css']
})
export class MasonryComponent {
  @Input() nodes: INode[];

  click(node: INode) {
    if (node.type === 'dir') {
      this.router.navigate(['dir'], { queryParams: { id: node.id } });
    } else {
      this.fileViewer.open(node, this.nodes);
    }
  }

  constructor(
    private router: Router,
    public fileViewer: FileViewer,
  ) { }

}
