import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { INode } from '../../service/file.service';
import { NodeResolver } from '../../service/node-resolver.service';

export interface CardContent {
  node: INode;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() node: INode;
  @ViewChild('content', { read: ViewContainerRef, static: true }) content: ViewContainerRef;

  constructor(
    private nodeResolver: NodeResolver
  ) { }

  ngOnInit() {
    const factory = this.nodeResolver.resolveCardContentFactory(this.node);
    const componentRef = this.content.createComponent(factory);
    (componentRef.instance as CardContent).node = this.node;
  }

}
