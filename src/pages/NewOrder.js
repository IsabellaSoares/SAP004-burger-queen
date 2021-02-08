import React, { useState, useEffect } from 'react'

import { getData, createOrder } from '../services/api'

import Orders from '../components/Orders'

import './index.css'

const NewOrder = () => {
  const [menu, setMenu] = useState([])
  const [activeMenu, setActiveMenu] = useState([])
  const [showDinnerMenu, setShowDinnerMenu] = useState(false)
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState('')
  const [table, setTable] = useState('')
  const [products, setProducts] = useState([])
  const [value, setValue] = useState(0)

  useEffect(() => {
    getData()
      .then(results => {
        setMenu(results)
        setLoading(false)
      })
      .catch(error => console.log(error))
  }, [])

  const handleMenuChange = (active, type) => {
    setShowDinnerMenu(active)
    
    if (type === 'all-day') {
      setActiveMenu([])
    } else {
      setActiveMenu(menu.filter(item => item.type === type))
    }
  }

  const handleShowOptionsChange = (sub_type) => {
    setActiveMenu(menu.filter(item => item.sub_type === sub_type))
  }

  const addProduct = (item) => {
    setValue(value + item.price)
    setProducts([ ...products,  item])
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const productsOrder = products.map(product => {
      return {
        id: product.id,
        qtd: 1
      }
    });

    createOrder(name, table, productsOrder)
      .then(() => {
        alert('Pedido criado!')
        clearForm()
      })
      .catch(() => alert('Não foi possível criar o pedido :('))
  }

  const clearForm = () => {
    setName('')
    setTable('')
    setProducts([])
    setActiveMenu([])
    setShowDinnerMenu(false)
    setValue(0)
  }

  return (
    <>
      <h1>New Order Page</h1>
      {
        loading ? <h3>Carregando cardápio...</h3> :
        (<form>
          <div className='inputs'>
            <div>
              <label htmlFor='name'>Nome</label>
              <input type='text' name='name' id='name' value={name} onChange={event => setName(event.target.value)} />
            </div>

            <div>
              <label htmlFor='table'>Mesa</label>
              <input type='text' name='table' id='table' value={table} onChange={event => setTable(event.target.value)} />
            </div>
          </div>

          <section>
            <h3>Cardápio</h3>
            <span onClick={() => handleMenuChange(false, 'breakfast')}>Café da manhã</span>
            <span onClick={() => handleMenuChange(true, 'all-day')}>Almoço e Jantar</span>
          </section>

          { showDinnerMenu && 
            (<section>
              <span onClick={() => handleShowOptionsChange(true, 'hamburguer')}>Hamburgueres</span>
              <span onClick={() => handleShowOptionsChange(false, 'side')}>Acompanhamentos</span>
              <span onClick={() => handleShowOptionsChange(false, 'drinks')}>Bebidas</span>
            </section>)
          }

          {
            <section>
              {
                activeMenu.map(item => 
                  <p 
                    key={item.id} 
                    onClick={() => addProduct(item)}
                  >
                    {`${item.name} ${item.flavor !== null ? `+ ${item.flavor}` : ''} ${item.complement !== null ? `+ ${item.complement}` : ''}`}
                  </p>
                )
              }
            </section>
          }

          <Orders products={products} setProducts={setProducts} value={value} setValue={setValue} />

          <button type='submit' onClick={(e) => handleSubmit(e)}>Enviar pedido</button>
        </form>)
      }
    </>
  )
}

export default NewOrder