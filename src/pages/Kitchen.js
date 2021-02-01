import React, { useState, useEffect } from 'react';

import {
  getOrders,
  startOrder,
  finishOrder,
} from '../services/FirebaseService';

const Kitchen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((results) => {
      const filteredResults = results.filter(result => !result.finished)
      setOrders(filteredResults);
      setLoading(false);
    });
  }, []);

  const update = (orderId) => {
    startOrder(orderId).then(
      getOrders().then((results) => {
        setOrders(results);
      })
    );
  };

  const finish = (orderId) => {
    finishOrder(orderId).then(
      getOrders().then((results) => {
        setOrders(results);
      })
    );
  };

  const diffMinutes = (dt2, dt1) => {
    dt1 = new Date(dt1 * 1000)
    dt2 = new Date(dt2 * 1000)

    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    
    diff /= 60;
    
    return Math.abs(Math.round(diff));
  }

  return (
    <>
      <h1>Kitchen Page</h1>

      { loading ? 
        ( <h3>Carregando pedidos...</h3> ) : 
        (orders.map((order) => (
          <section key={order.id}>
            <h3>{`Mesa: ${order.table}`}</h3>

            <h3>{`Pedido feito em: ${new Date(order.createdAt * 1000).getHours()}:${new Date(order.createdAt * 1000).getMinutes()}`}</h3>

            { order.updatedAt && 
              (
                <h3>{`Pedido iniciado em: ${new Date(order.updatedAt * 1000).getHours()}:${new Date(order.updatedAt * 1000).getMinutes()}`}</h3>
              )
            }

            { order.finished && 
              (
                <h3>{`Pedido finalizado em: ${new Date(order.finished * 1000).getHours()}:${new Date(order.finished * 1000).getMinutes()} (${diffMinutes(order.updatedAt, order.finished)} minutos)`}</h3>
              )
            }

            <section>
              <h4>Pedido</h4>
              { order.products.map((product) => (
                  <>
                    <p>{product.item}</p>
                    {product.option !== '' && <p>{product.option}</p>}
                    {product.additionals?.length !== 0 &&
                      product.additionals?.map((add) => <p>{add}</p>)}
                  </>
              ))}

              { !order.updatedAt && 
                (
                  <button onClick={() => update(order.id)}>
                    Iniciar preparo
                  </button>
                )
              }

              { order.updatedAt && !order.finished &&
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
