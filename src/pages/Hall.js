import React from 'react'
import { useHistory } from 'react-router-dom'

const Hall = () => {
  const history = useHistory()

  return (
    <>
      <h1>Hall Page</h1>
      <button onClick={() => history.push('/hall/new_order')}>Novo pedido</button>
      <button onClick={() => history.push('/hall/ready_orders')}>Checar cozinha</button>
    </>
  )
}

export default Hall