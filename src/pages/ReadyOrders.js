import React, { useState, useEffect } from 'react'

import { getReadyOrders, deliverOrder } from '../services/FirebaseService';

const ReadyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReadyOrders().then((results) => {
      const filteredResults = results.filter(result => !result.delivered)
      setOrders(filteredResults);
      setLoading(false);
    });
  }, []);

  const deliver = (orderId) => {
    deliverOrder(orderId).then(
      getReadyOrders().then((results) => {
        const filteredResults = results.filter(result => !result.delivered)
        setOrders(filteredResults);
      })
    );
  }

  return (
    <>
      { loading ? 
        ( <h3>Carregando pedidos...</h3> ) : 
        (orders.map((order) => (
          <section key={order.id}>
            <h3>{`Mesa: ${order.table}`}</h3>
            <h3>{`Nome: ${order.name}`}</h3>

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