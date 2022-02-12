import { Messaging } from './services/messaging';

import { Persistence } from './services/persistence';
import { Product } from './entities/product';
import { ShoppingCart } from './entities/shopping-cart';
import { Order } from './entities/order';

const shoppingcart = new ShoppingCart();
const messaging = new Messaging();
const persistence = new Persistence();

const order = new Order(shoppingcart, messaging, persistence);

shoppingcart.addItem(new Product('caderno', 15.59));
shoppingcart.addItem(new Product('lapis', 1.58));
shoppingcart.addItem(new Product('canetas', 32.89));
shoppingcart.addItem(new Product('bolsa', 243.21));
shoppingcart.addItem(new Product('apontador', 8.92));

console.log(shoppingcart.items);
console.log(shoppingcart.total());
console.log(order.orderStatus);
order.checkOut();
console.log(order.orderStatus);
