import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { FileService, INode } from '../../service/file.service';
import { FileViewer } from '../../com/file-viewer/file-viewer.component';

@Component({
  selector: 'app-root',
  templateUrl: './dir.component.html',
  styleUrls: ['./dir.component.css']
})
export class DirComponent implements OnInit {

  id;
  parent;
  loading = true;
  nodes: INode[] = [];
  sub: Subscription;
  @ViewChild('popupContainer', { read: ViewContainerRef, static: true }) popupContainerRef: ViewContainerRef;

  back() { window.history.back(); }
  updateContent(refresh = false): void {
    if (this.sub) { this.sub.unsubscribe(); }
    this.nodes.length = 0;
    const id = this.route.snapshot.queryParamMap.get('id');
    this.loading = true;
    this.id = !id ? '/' : id === '' ? '/' : id;
    this.sub = this.fileService.getDir(this.id, refresh).pipe(
      tap(nodes => this.nodes = nodes),
      concatMap(_ => this.fileService.getINode(this.id)),
      tap(node => this.parent = node.parent),
      tap(_ => this.loading = false)
    ).subscribe();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fileService: FileService,
    private popupService: FileViewer,
  ) {
    this.router.events.subscribe(event => (event instanceof NavigationEnd) ? this.updateContent() : null);
  }

  ngOnInit() {
    this.popupService.popupContainerRef = this.popupContainerRef;
  }
}
