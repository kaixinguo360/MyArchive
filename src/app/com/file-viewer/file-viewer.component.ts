import { Component, ComponentFactoryResolver, Injectable, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { INode } from '../../service/file.service';
import { NodeResolver } from '../../service/node-resolver.service';
import { ContentDetail } from '../content-detail/content-detail';

@Component({
  selector: 'app-file-tabs',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.css']
})
export class FileViewerComponent implements OnInit {
  @Input() index: number;
  @Input() nodes: INode[];
  node: INode;
  @ViewChild('content', { read: ViewContainerRef, static: true }) contentHost: ViewContainerRef;
  private content: ContentDetail;

  constructor(
    public fileViewer: FileViewer,
    private nodeResolver: NodeResolver,
  ) { }

  ngOnInit() {
    this.loadContent();
  }
  loadContent() {
    this.node = this.nodes[this.index];
    if (this.content) { this.contentHost.remove(); }
    const factory = this.nodeResolver.resolveContentDetailFactory(this.node);
    const componentRef = this.contentHost.createComponent(factory);
    this.content = (componentRef.instance as ContentDetail);
    this.content.node = this.node;
  }
  next() {
    this.index = (this.index + this.nodes.length + 1) % this.nodes.length;
    this.loadContent();
  }
  previous() {
    this.index = (this.index + this.nodes.length - 1) % this.nodes.length;
    this.loadContent();
  }

}

@Injectable({
  providedIn: 'root'
})
export class FileViewer {
  public popupContainerRef: ViewContainerRef;
  public popup: FileViewerComponent;

  public open(node: INode, nodes?: INode[]) {
    if (this.popup) { this.close(); }
    const factory = this.componentFactoryResolver.resolveComponentFactory(FileViewerComponent);
    const componentRef = this.popupContainerRef.createComponent(factory);
    this.popup = (componentRef.instance as FileViewerComponent);
    if (nodes) {
      this.popup.nodes = nodes;
      this.popup.index = nodes.findIndex(n => n === node);
    } else {
      this.popup.nodes = [node];
      this.popup.index = 0;
    }
  }
  public close() {
    this.popupContainerRef.remove();
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }
}
