type CartItem = { name: string; price: number };
type OrderStatus = 'open' | 'closed';

export class ShoppingCartLegacy {
  //definindo as caracteristicas do meu cart
  private readonly _items: CartItem[] = [];
  private _orderStatus: OrderStatus = 'open';

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    //pensei num pop aqui, mas pensa so, um pop tirariia apenas o ultimo item
    //com splice eu tiro qualuqer um que eu queira sabendo o index
    this._items.splice(index, 1);
  }

  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  total(): number {
    //tofixed transforma em string, logo daria erro, por isso esse '+' ali.
    //ele ja converte de string para number depois de tudo
    return +this._items
      .reduce((total, next) => total + next.price, 0)
      .toFixed(2);
  }

  checkOut(): void {
    if (this.isEmpty()) {
      console.log('Please select at least one item');
    }

    this._orderStatus = 'closed';
    this.sendMessage(
      `Your itens had been processed successfully ${this.total()}`
    );
    this.saveOrder();
    this.clearOrderStatus();
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  sendMessage(msg: string): void {
    console.log('mensagem enviada:' + msg);
  }

  saveOrder(): void {
    console.log('request saved successfully');
  }

  clearOrderStatus(): void {
    console.log('cart cleared successfully');
    this._items.length = 0;
  }
}

const shoppingcart = new ShoppingCartLegacy();
shoppingcart.addItem({ name: 'caderno', price: 15.59 });
shoppingcart.addItem({ name: 'lapis', price: 1.58 });
shoppingcart.addItem({ name: 'canetas', price: 32.89 });
shoppingcart.addItem({ name: 'bolsa', price: 243.21 });
shoppingcart.addItem({ name: 'apontador', price: 8.92 });

console.log(shoppingcart.items);
console.log(shoppingcart.total());
console.log(shoppingcart.orderStatus);
shoppingcart.checkOut();
console.log(shoppingcart.orderStatus);
