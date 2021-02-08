import React, { useState } from 'react';

import {
  getOrders,
  finishOrder,
} from '../services/api';

const Kitchen = () => {
  const [orders, setOrders] = useState([]);
  const [waitingClick, setWaitingClick] = useState(true);
  const [loading, setLoading] = useState(false);

  const getPendingOrders = () => {
    setWaitingClick(false);
    setLoading(true);

    getOrders().then((results) => {
      const filteredResults = results.filter(result => result.status === 'pending');

      filteredResults.sort((result1, result2) => {
        if (result1.createdAt > result2.createdAt) return 1;
        if (result1.createdAt < result2.createdAt) return -1;
      });

      setOrders(filteredResults);
      setLoading(false);
    });
  }

  const getFinishedOrders = () => {
    setWaitingClick(false);
    setLoading(true);

    getOrders().then((results) => {
      const filteredResults = results.filter(result => result.status === 'finished');

      filteredResults.sort((result1, result2) => {
        if (result1.createdAt > result2.createdAt) return 1;
        if (result1.createdAt < result2.createdAt) return -1;
      });

      setOrders(filteredResults);
      setLoading(false);
    });
  }

  const finish = (orderId) => {
    finishOrder(orderId).then(
      setOrders(orders.filter(order => order.id !== orderId))
    );
  };

  return (
    <>
      <h1>Kitchen Page</h1>

      <button onClick={() => getPendingOrders()}>
        Ver pedidos em aberto
      </button>

      <button onClick={() => getFinishedOrders()}>
        Ver pedidos concluídos
      </button>

      { waitingClick ? ( <h3>Escolha uma opção para visualizar os pedidos</h3> ) : loading ? 
        ( <h3>Carregando pedidos...</h3> ) : 
        (orders.map((order) => (
          <section key={order.id}>
            <h3>{`Mesa: ${order.table}`}</h3>

            <h3>{`Pedido feito em: ${new Date(order.createdAt).getDay()}/${new Date(order.createdAt).getMonth()}/${new Date(order.createdAt).getFullYear()} às ${new Date(order.createdAt).getHours()}:${new Date(order.createdAt).getMinutes()}:${new Date(order.createdAt).getSeconds()}`}</h3>

            { order.status === 'finished' && 
              (
                <h3>{`Pedido finalizado em: ${new Date(order.processedAt).getDay()}/${new Date(order.processedAt).getMonth()}/${new Date(order.processedAt).getFullYear()} às ${new Date(order.processedAt).getHours()}:${new Date(order.processedAt).getMinutes()}:${new Date(order.processedAt).getSeconds()}`}</h3>
              )
            }

            <section>
              <h4>Pedido</h4>
              { order.Products.map((product) => (
                <p>{`${product.name} ${product.flavor !== null ? `+ ${product.flavor}` : ''} ${product.complement !== null ? `+ ${product.complement}` : ''}`}</p>
              ))}

              { !order.processedAt &&
                (
                  <button onClick={() => finish(order.id)}>
                    Concluir pedido
                  </button>
                )
              }
            </section>
          </section>
        ))
      )}
    </>
  );
};

export default Kitchen;
