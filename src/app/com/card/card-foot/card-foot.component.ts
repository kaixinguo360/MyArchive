import { Component, Input, OnInit } from '@angular/core';

import { INode } from '../../../service/file.service';
import { Order} from '../../../order';
import { OrderService } from '../../../service/order.service';
import { NodeResolver, TypeInfo } from '../../../service/node-resolver.service';

@Component({
  selector: 'app-card-foot',
  templateUrl: './card-foot.component.html',
  styleUrls: ['./card-foot.component.css']
})
export class CardFootComponent implements OnInit {
  @Input() node: INode;
  typeInfo: TypeInfo;
  time: number;

  constructor(
    private nodeResolver: NodeResolver,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.typeInfo = this.nodeResolver.resolveTypeInfo(this.node);
    switch (this.orderService.getOrder()) {
      case Order.MTIME_ASC:
      case Order.MTIME_DESC: { this.time = this.node.mtime; break; }
      default: { this.time = this.node.ctime; }
    }
  }

}
