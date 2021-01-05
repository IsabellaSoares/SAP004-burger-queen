import React from 'react'

const Orders = ({ products, setProducts }) => {
  const deleteProduct = (item) => {
    let copy = products.filter(product => product.id !== item.id)
    setProducts(copy)
    value -= item.price
  }

  let value = products.length !== 0 ? products.reduce((acc, current) => acc + current.price, 0) : 0

  return (
    <div>
      <h2>Pedido</h2>
      { products.map(item => <button key={item.id} onClick={() => deleteProduct(item)}>{item.item}</button>) }
      <h3>Valor total</h3>
      <p>{value}</p>
    </div>
  )
}

export default Orders