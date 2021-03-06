import { Component, OnInit } from '@angular/core';
import { Order } from '../../order';
import { OrderService } from '../../service/order.service';

class OrderMenuItem {
  title: string;
  tip: string;
  order: Order;
  icon: string;
}

@Component({
  selector: 'app-order-selector',
  templateUrl: './order-selector.component.html',
  styleUrls: ['./order-selector.component.css']
})
export class OrderSelectorComponent implements OnInit {
  public orderMenuItems: OrderMenuItem[];
  public currentOrder: Order;

  changeOrder(order: Order) {
    this.orderService.setOrder(order);
    location.reload();
  }

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.currentOrder = this.orderService.getOrder();
    this.orderMenuItems  = [
      { title: '↑ 修改时间', tip: '最旧在前', icon: 'access_time', order: Order.MTIME_ASC },
      { title: '↓ 修改时间', tip: '最新在前', icon: 'access_time', order: Order.MTIME_DESC },
      { title: '↑ 创建时间', tip: '最旧在前', icon: 'create_new_folder', order: Order.CTIME_ASC },
      { title: '↓ 创建时间', tip: '最新在前', icon: 'create_new_folder', order: Order.CTIME_DESC },
      { title: '↑ 名称', tip: 'A在前', icon: 'sort_by_alpha', order: Order.NAME_ASC },
      { title: '↓ 名称', tip: 'Z在前', icon: 'sort_by_alpha', order: Order.NAME_DESC },
      { title: '随机', tip: '随机排列', icon: 'blur_on', order: Order.RANDOM }
    ];
  }

}
