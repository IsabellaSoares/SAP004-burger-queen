import React from 'react'

const Orders = ({ products, setProducts, value, setValue }) => {
  const deleteProduct = (item) => {
    let copy = products.filter(product => product.id !== item.id)
    setProducts(copy)
    setValue(value -= item.price)
  }

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