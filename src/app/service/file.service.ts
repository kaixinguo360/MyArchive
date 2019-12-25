import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, map, shareReplay } from 'rxjs/operators';

import { StorageService } from './storage.service';
import { appConfig } from '../../environments/app-config';

export class INode {
  id: string; // ID
  name: string; // Name
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

  private root = appConfig.apiRoot;
  private fetching: Map<string, Observable<INode[]>> = new Map();

  public getDir(id: string, update = false): Observable<INode[]> {
    const ob = this.getINode(id).pipe(
      concatMap(node => {
        const files: object = node.data;
        const obs = [];
        for (const filesKey of Object.keys(files)) {
          obs.push(this.getINode(files[filesKey]));
        }
        return forkJoin(obs);
      })
    );
    return (update === true)
      ? this.removeINode(id).pipe(concatMap(_ => ob))
      : ob;
  }
  public getINode(id: string, update = false): Observable<INode> {
    const ob = this.storageService.getItem<INode>(id).pipe(
      concatMap(node => {
        if (node) {
          return of(node);
        } else {
          return this.fetchINode(id);
        }
      })
    );
    return (update === true)
      ? this.removeINode(id).pipe(concatMap(_ => ob))
      : ob;
  }
  public setINode(id: string, node: INode): Observable<INode> {
    return this.storageService.setItem<INode>(id, node);
  }
  public removeINode(id: string): Observable<void> {
    return this.storageService.getItem<INode>(id).pipe(
      concatMap(node => {
        if (node && node.type === 'dir') {
          const files: object = node.data;
          const obs = [];
          for (const filesKey of Object.keys(files)) {
            obs.push(this.removeINode(files[filesKey]));
          }
          forkJoin(obs).subscribe();
        }
        return this.storageService.removeItem(id);
      })
    );
  }

  public fetchDir(path: string): Observable<INode[]> {
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
  public fetchINode(id: string): Observable<INode> {
    const idx = id.lastIndexOf('/');
    const path = (idx < 0) ? '' : id.substr(0, idx);
    return (this.fetching.has(path) ? this.fetching.get(path) : this.fetchDir(path)).pipe(
      map(nodes => nodes.find(node => node.id === id))
    );
  }

  private handleError(err) { }

  constructor(
    private storageService: StorageService,
    private http: HttpClient,
  ) { }
}
