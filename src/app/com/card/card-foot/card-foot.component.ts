import { Component, Input, OnInit } from '@angular/core';

import { INode } from '../../../service/file.service';
import { NodeResolver, TypeInfo } from '../../../service/node-resolver.service';

@Component({
  selector: 'app-card-foot',
  templateUrl: './card-foot.component.html',
  styleUrls: ['./card-foot.component.css']
})
export class CardFootComponent implements OnInit {
  @Input() node: INode;
  typeInfo: TypeInfo;

  constructor(private nodeResolver: NodeResolver) { }

  ngOnInit() {
    this.typeInfo = this.nodeResolver.resolveTypeInfo(this.node);
  }

}
