import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { FileService, INode } from '../service/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  path;
  parent;
  nodes: INode[] = [];
  sub: Subscription;

  updateContent(refresh = false): void {
    if (this.sub) { this.sub.unsubscribe(); }
    this.nodes.length = 0;
    const path = this.route.snapshot.queryParamMap.get('path');
    this.parent = this.path;
    this.path = !path ? '/' : path === '' ? '/' : path;
    this.sub = this.fileService.getDir(this.path, refresh).pipe(
      tap(nodes => this.nodes = nodes),
      concatMap(_ => this.fileService.getINode(this.path)),
      tap(node => this.parent = node.parent)
    ).subscribe();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fileService: FileService,
  ) {
    this.router.events
      .subscribe(
        event => {
          if (event instanceof  NavigationEnd) {
            this.updateContent();
          }
        }
      );
  }
}
