import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  renderOrder(key) {
    const fish = this.props.fishes[key];
    const quantity = this.props.order[key];
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
    debugger;
    return(
      <li key={key}>
        <span>
          <span key={quantity}>{quantity} </span>
          x {fish.name} {removeButton}
        </span>
        <span className='price'>{formatPrice(quantity * fish.price)}</span>
      </li>
    );
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const quantity = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';

      if (isAvailable) {
        return prevTotal + (quantity * fish.price || 0);
      }

      return prevTotal;
    }, 0);
    return(
      <div className='order-wrap'>
        <h2>Your Order</h2>
        <ul className='order'>
          {orderIds.map((key) => this.renderOrder(key))}
          <li className='total'>
            <strong>Total: </strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    );
  }
}

export default Order;
