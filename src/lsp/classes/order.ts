import { Messaging } from '../services/messaging';
import { Persistence } from '../services/persistence';
import { OrderStatus } from './interface/order-status';
import { ShoppingCart } from './shopping-cart';

export class Order {
  private _orderStatus: OrderStatus = 'open';
  constructor(
    private readonly cart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persistence: Persistence
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkOut(): void {
    if (this.cart.isEmpty()) {
      console.log('Please select at least one item');
    }

    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `Your itens had been processed successfully ${this.cart.totalWithDesconunt()}`
    );
    this.persistence.saveOrder();
    this.cart.clearOrderStatus();
  }
}
