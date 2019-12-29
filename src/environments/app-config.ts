import { Order } from '../app/order';

export const AppConfig = {
  iNodeStore: 'INodeStore',
  apiRoot: '/myfile/?path=',
  columnWidth: 240,
  columnMargin: 8,
  mobileWidth: 640,
  defaultOrder: Order.MTIME_DESC,
  defaultMobileColumn: 2,
};

