import { Injectable } from '@angular/core';
import { AppConfig } from '../../environments/app-config';
import { Order } from '../order';
import { PreferenceService } from './preference.service';
import { INode } from './file.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  defaultOrder = AppConfig.defaultOrder;

  public getOrder(): Order {
    const order = this.preference.get('order', this.defaultOrder);
    switch (order) {
      case Order.MTIME_DESC: return Order.MTIME_DESC;
      case Order.MTIME_ASC: return Order.MTIME_ASC;
      case Order.CTIME_DESC: return Order.CTIME_DESC;
      case Order.CTIME_ASC: return Order.CTIME_ASC;
      case Order.NAME_DESC: return Order.NAME_DESC;
      case Order.NAME_ASC: return Order.NAME_ASC;
      case Order.RANDOM: return Order.RANDOM;
      default:
        this.preference.set('order', this.defaultOrder);
        return this.defaultOrder;
    }
  }
  public setOrder(order: Order): void {
    if (order == null) {
      this.preference.set('order', this.defaultOrder);
    } else {
      this.preference.set('order', order);
    }
  }
  public sort(nodes: INode[], dirType = 'dir', order?: Order): INode[] {
    return nodes.sort((a, b) => {
      if (a.type === b.type || (a.type !== dirType && b.type !== dirType)) {
        switch (order ? order : this.getOrder()) {
          case Order.MTIME_ASC: return a.mtime - b.mtime;
          case Order.MTIME_DESC: return b.mtime - a.mtime;
          case Order.CTIME_ASC: return a.ctime - b.ctime;
          case Order.CTIME_DESC: return b.ctime - a.ctime;
          case Order.NAME_ASC: return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
          case Order.NAME_DESC: return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
          case Order.RANDOM: return Math.random() > 0.5 ? -1 : 1;
        }
      } else {
        return (a.type === dirType) ? -1 : 1;
      }
    });
  }

  constructor(
    private preference: PreferenceService
  ) { }
}
