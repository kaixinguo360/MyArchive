import { Component, Input, OnChanges, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';

import { INode } from '../../service/file.service';
import { NodeResolver } from '../../service/node-resolver.service';

export interface ContentPreview {
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
export class CardComponent implements OnChanges {

  @Input() node: INode;
  @Input() width: number;
  @Input() maxWidth: number;
  @Input() height: number;
  @Input() maxHeight: number;
  @ViewChild('content', { read: ViewContainerRef, static: true }) contentHost: ViewContainerRef;
  contentHeight: number;
  contentMaxHeight: number;
  footHeight = 64;
  private content: ContentPreview;

  constructor(
    private nodeResolver: NodeResolver
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.createContent();
    this.resize();
  }

  private createContent() {
    if (this.content) { this.contentHost.remove(); }
    const factory = this.nodeResolver.resolveCardContentFactory(this.node);
    const componentRef = this.contentHost.createComponent(factory);
    this.content = (componentRef.instance as ContentPreview);
  }

  private resize() {
    this.content.node = this.node;

    this.content.width = this.width;
    this.content.maxWidth = this.maxWidth;
    if (this.height) {
      this.contentHeight = this.height - this.footHeight;
      this.content.height = this.contentHeight;
    }
    if (this.maxHeight) {
      this.contentMaxHeight = this.maxHeight - this.footHeight;
      this.content.maxHeight = this.contentMaxHeight;
    }
  }

}
