import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { catchError, concatMap, tap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

import { AppConfig } from '../../../environments/app-config';
import { FileService, INode } from '../../service/file.service';
import { FileViewer } from '../../com/file-viewer/file-viewer.component';

@Component({
  selector: 'app-root',
  templateUrl: './dir.component.html',
  styleUrls: ['./dir.component.css']
})
export class DirComponent implements OnInit {

  id;
  node;
  nodes: INode[] = [];
  sub: Subscription;
  error = false;
  @ViewChild('popupContainer', { read: ViewContainerRef, static: true }) popupContainerRef: ViewContainerRef;

  back() {
    window.stop();
    window.history.back();
  }
  updateContent(refresh = false): void {
    this.error = false;
    if (this.sub) { this.sub.unsubscribe(); }
    this.nodes.length = 0;
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.id = !this.id ? AppConfig.defaultId : this.id === '' ? AppConfig.defaultId : this.id;
    this.node = null;
    this.sub = this.fileService.getDir(this.id, refresh).pipe(
      tap(nodes => this.nodes = nodes),
      concatMap(_ => this.fileService.getINode(this.id)),
      tap(node => this.node = node),
      catchError(err => {
        this.error = true;
        return of(err);
      } )
    ).subscribe();
  }
  refresh() { location.reload(); }

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
