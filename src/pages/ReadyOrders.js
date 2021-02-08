import React, { useState, useEffect } from 'react'

import { getOrders, updateOrder } from '../services/api';

const ReadyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((results) => {
      const filteredResults = results.filter(result => result.status === 'finished');

      filteredResults.sort((result1, result2) => {
        if (result1.updatedAt > result2.updatedAt) return 1;
        if (result1.updatedAt < result2.updatedAt) return -1;
      });

      setOrders(filteredResults);
      setLoading(false);
    });
  }, []);

  const deliver = (orderId) => {
    updateOrder(orderId, 'delivered').then(
      setOrders(orders.filter(order => order.id !== orderId))
    );
  }

  return (
    <>
      <h1>Pedidos prontos para serem entregues</h1>
      
      { loading ? 
        ( <h3>Carregando pedidos...</h3> ) : 
        (orders.map((order) => (
          <section key={order.id}>
            <h3>{`Mesa: ${order.table}`}</h3>
            <h3>{`Nome: ${order.client_name}`}</h3>

            <section>
              <h4>Pedido</h4>
              { order.Products.map((product) => (
                <p>{`${product.name} ${product.flavor !== null ? `+ ${product.flavor}` : ''} ${product.complement !== null ? `+ ${product.complement}` : ''}`}</p>
              ))}

              <button onClick={() => deliver(order.id)}>
                Entregar pedido
              </button>
            </section>
          </section>
        ))
      )}
    </>
  )
}

export default ReadyOrders