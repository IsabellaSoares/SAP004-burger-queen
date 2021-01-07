import React, { useState, useEffect } from 'react'

import { getOrders } from '../services/FirebaseService'

const Kitchen = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOrders().then(results => {
      setOrders(results)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <h1>Kitchen Page</h1>
      <h3>Pedidos</h3>

      {
        loading ? <h3>Carregando pedidos...</h3> : orders.map(order => <p key={order.date}>{order.name}</p>) 
      }
    </>
  )
}

export default Kitchen