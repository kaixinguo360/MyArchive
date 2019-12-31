import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, defaultIfEmpty, map, shareReplay, tap } from 'rxjs/operators';

import { AppConfig } from '../../environments/app-config';
import { StorageService } from './storage.service';
import { OrderService } from './order.service';

export class INode {
  id: string; // ID
  name: string; // Name
  parent: string; // Parent
  type: string; // Type
  data: any; // Content
  atime: number; // Access Time
  mtime: number; // Modify Time
  ctime: number; // Create Time
}

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private root = AppConfig.apiUrl;
  private fetching: Map<string, Observable<INode[]>> = new Map();

  public getDir(id: string, refresh = false): Observable<INode[]> {
    const handler = node => {
      return forkJoin(
        Object.keys(node.data).map(fileId => this.getINode(node.data[fileId]))
      ).pipe(
        tap(nodes => this.orderService.sort(nodes)),
        defaultIfEmpty([]),
      );
    };
    return (refresh)
      ? this.removeINode(id).pipe(
        concatMap(_ => this.fetchINode(id)),
        concatMap(handler)
      ) : this.getINode(id).pipe(
        concatMap(handler)
      );
  }
  public getINode(id: string, refresh = false): Observable<INode> {
    return (refresh)
      ? this.removeINode(id).pipe(
        concatMap(_ => this.fetchINode(id))
      ) : this.storageService.getItem<INode>(id).pipe(
        concatMap(node => node ? of(node) : this.fetchINode(id))
      );
  }
  public removeINode(id: string): Observable<void> {
    return this.storageService.getItem<INode>(id).pipe(
      concatMap(node => (!node || node.type !== 'dir') ? of(node) :
        forkJoin(
          Object.keys(node.data).map(fileId => this.removeINode(node.data[fileId]))
        ).pipe(
          defaultIfEmpty()
        )
      ),
      concatMap(_ => this.storageService.removeItem(id))
    );
  }

  private setINode(id: string, node: INode): Observable<INode> {
    return this.storageService.setItem<INode>(id, node);
  }
  private fetchDir(path: string): Observable<INode[]> {
    if (this.fetching.has(path)) {
      return this.fetching.get(path);
    } else {
      const ob = this.http.get<INode[]>(this.root + path).pipe(
        concatMap(nodes => {
          const obs = [];
          nodes.forEach(node => {
            obs.push(this.setINode(node.id, node));
          });
          this.fetching.delete(path);
          return forkJoin(obs);
        }),
        catchError(err => {
          this.handleError(err);
          return throwError(err);
        }),
        shareReplay(1),
      );
      this.fetching.set(path, ob);
      return ob;
    }
  }
  private fetchINode(id: string): Observable<INode> {
    if (id === '/') {
      return this.fetchDir('/').pipe(
        concatMap(nodes => {
          const rootNode: INode = {
            id: '/', name: '/',
            atime: 0, mtime: 0, ctime: 0,
            parent: null,
            type: '/',
            data: []
          };
          nodes.forEach(n => rootNode.data[n.name] = n.id);
          return this.setINode('/', rootNode);
        })
      );
    } else {
      const idx = id.lastIndexOf('/');
      const path = (idx < 0) ? '/' : id.substr(0, idx);
      return this.fetchDir(path).pipe(
        map(nodes => nodes.find(node => node.id === id))
      );
    }
  }

  private handleError(err) {
    console.log(err);
    this.matSnackBar.open('Network connection error', 'Close', {
      duration: 2000,
    });
  }

  constructor(
    private http: HttpClient,
    private matSnackBar: MatSnackBar,
    private storageService: StorageService,
    private orderService: OrderService,
  ) { }
}
