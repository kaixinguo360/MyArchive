import { Injectable } from '@angular/core';
import { NgForage } from 'ngforage';
import { from, Observable } from 'rxjs';

import { appConfig } from '../../environments/app-config';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public getItem<T = any>(key: string): Observable<T> {
    return from(this.ngf.getItem<T>(key));
  }

  public setItem<T = any>(key: string, data: T): Observable<T> {
    return from(this.ngf.setItem<T>(key, data));
  }

  public removeItem(key: string): Observable<void> {
    return (key === '')
      ? from(this.ngf.clear())
      : from(this.ngf.removeItem(key));
  }

  constructor(
    private readonly ngf: NgForage
  ) {
    this.ngf.name = appConfig.iNodeStore;
  }
}
