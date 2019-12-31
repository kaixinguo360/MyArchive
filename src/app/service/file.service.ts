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

  private apiUrl = AppConfig.apiUrl;

  public getDir(id: string, refresh = false): Observable<INode[]> {
    const ob = this.getINode(id).pipe(
      concatMap(node => this.fetchINodes(node.data)),
      map(nodes => this.orderService.sort(nodes)),
    );
    return refresh ? this.storageService.removeItem(id).pipe(concatMap(_ => ob)) : ob;
  }
  public getINode(id: string, refresh = false): Observable<INode> {
    const ob = this.storageService.getItem(id).pipe(
      concatMap(node => node ? of(node) : this.fetchINode(id)),
    );
    return refresh ? this.storageService.removeItem(id).pipe(concatMap(_ => ob)) : ob;
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

  private fetchINode(id: string): Observable<INode> {
    return this.http.post<INode[]>(this.apiUrl, [ id ]).pipe(
      concatMap(nodes => this.storageService.setItem(id, nodes[0])),
      catchError(err => {
        this.handleError(err);
        return throwError(err);
      }),
      shareReplay(1),
    );
  }
  private fetchINodes(ids: { [key: string]: string }): Observable<INode[]> {
    const obs: Observable<any>[] = [];
    const cached: INode[] = [];
    const uncached: string[] = [];
    Object.values(ids).forEach(id => obs.push(this.storageService.getItem(id).pipe(
      tap(node => node ? cached.push(node) : uncached.push(id)),
    )));
    return forkJoin(obs).pipe(
      concatMap(() => !uncached.length ? of(cached) :
        this.http.post<INode[]>(this.apiUrl, uncached).pipe(
          tap(nodes => nodes.forEach(n => this.storageService.setItem(n.id, n))),
          map(nodes => cached.concat(nodes)),
        )
      ),
    );
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
