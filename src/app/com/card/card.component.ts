import { Component, Input, OnChanges, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';

import { INode } from '../../service/file.service';
import { NodeResolver } from '../../service/node-resolver.service';
import { ContentPreview } from '../content-preview/content-preview';

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
  contentHeight: number;
  contentMaxHeight: number;
  footHeight = 64;
  @ViewChild('content', { read: ViewContainerRef, static: true })contentHost: ViewContainerRef;
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
    const factory = this.nodeResolver.resolveContentPreviewFactory(this.node);
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
