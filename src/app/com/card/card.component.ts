import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';

import { INode } from '../../service/file.service';
import { NodeResolver } from '../../service/node-resolver.service';

export interface CardContent {
  node: INode;
  width: number;
  height: number;
  maxWidth: number;
  maxHeight: number;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {

  @Input() node: INode;
  @Input() width: number;
  @Input() maxWidth: number;
  @Input() height: number;
  @Input() maxHeight: number;
  @ViewChild('content', { read: ViewContainerRef, static: true }) contentHost: ViewContainerRef;
  contentHeight: number;
  contentMaxHeight: number;
  footHeight = 64;
  private content: CardContent;

  constructor(
    private nodeResolver: NodeResolver
  ) { }

  ngOnInit() {
    this.createContent();
    this.resize();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.node) { this.createContent(); }
    this.resize();
  }

  private createContent() {
    const factory = this.nodeResolver.resolveCardContentFactory(this.node);
    const componentRef = this.contentHost.createComponent(factory);
    this.content = (componentRef.instance as CardContent);
  }

  private resize() {
    this.contentHeight = this.height - this.footHeight;
    this.contentMaxHeight = this.maxHeight - this.footHeight;
    this.content.node = this.node;
    this.content.width = this.width;
    this.content.maxWidth = this.maxWidth;
    this.content.height = this.contentHeight;
    this.content.maxHeight = this.contentMaxHeight;
  }

}
