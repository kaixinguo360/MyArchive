import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { INode } from '../../service/file.service';
import { NodeResolver } from '../../service/node-resolver.service';

export interface NodeCard {
  node: INode;
}

@Component({
  selector: 'app-card',
  template: '<ng-container #card></ng-container>'
})
export class CardComponent implements OnInit {

  @Input() node: INode;
  @ViewChild('card', { read: ViewContainerRef, static: true }) card: ViewContainerRef;

  constructor(
    private nodeResolver: NodeResolver
  ) { }

  ngOnInit() {
    const factory = this.nodeResolver.resolveCardFactory(this.node);
    const componentRef = this.card.createComponent(factory);
    (componentRef.instance as NodeCard).node = this.node;
  }

}
