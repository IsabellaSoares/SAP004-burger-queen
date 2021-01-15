import React, { useState, useEffect } from 'react'

import { getData, createOrder } from '../services/FirebaseService'

import Orders from '../components/Orders'

import './index.css'

const NewOrder = () => {
  const [menu, setMenu] = useState([])
  const [activeMenu, setActiveMenu] = useState([])
  const [showDinnerMenu, setShowDinnerMenu] = useState(false)
  const [showAdditionals, setShowAdditionals] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState('')
  const [table, setTable] = useState('')
  const [products, setProducts] = useState([])
  const [value, setValue] = useState(0)

  useEffect(() => {
    getData('menu').then(results => {
      setMenu(results)
      setLoading(false)
    })
  }, [])

  const handleMenuChange = (active, type) => {
    setShowDinnerMenu(active)
    setActiveMenu(menu.filter(item => item.type === type))
  }

  const handleShowOptionsChange = (active, type) => {
    setActiveMenu(menu.filter(item => item.type === type))
    setShowOptions(active)
    setShowAdditionals(active)
  }

  const addProduct = (item) => {
    setValue(value + item.price)

    let newProduct = {
      id: products.length,
      item: item.item,
      price: item.price
    }

    if (item.type === 'hamburguer') {
      newProduct.option = ''
      newProduct.additionals = []
    }

    setProducts([ ...products,  newProduct])
  }

  const addOption = (item) => {
    products[products.length - 1].option = item
    setProducts([ ...products])
  }

  const addAdditional = (item) => {
    products[products.length - 1].additionals.push(item.item)
    products[products.length - 1].price = value + item.price
    
    setValue(value + item.price)
    setProducts([ ...products])
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const order = {
      createdAt: new Date(),
      updatedAt: null,
      finished: null,
      name,
      table,
      value,
      products
    }

    createOrder(order)
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
            <span onClick={() => handleMenuChange(true, [])}>Almoço e Jantar</span>
          </section>

          { showDinnerMenu && 
            (<section>
              <span onClick={() => handleShowOptionsChange(true, 'hamburguer')}>Hamburgueres</span>
              <span onClick={() => handleShowOptionsChange(false, 'side_diches')}>Acompanhamentos</span>
              <span onClick={() => handleShowOptionsChange(false, 'drink')}>Bebidas</span>
            </section>)
          }

          {
            <section>
              {
                activeMenu.map(item => 
                  <span 
                    key={item.id} 
                    onClick={() => addProduct(item)}
                  >
                    {item.item}
                  </span>
                )
              }
            </section>
          }
        
          { showOptions && (
            <section>
              <h3>Selecione o tipo da carne</h3>
              <span onClick={() => addOption('Carne bovina')}>Carne bovina</span>
              <span onClick={() => addOption('Carne de frango')}>Carne de frango</span>
              <span onClick={() => addOption('Vegetariano')}>Vegetariano</span>
            </section>
          ) }

          { showAdditionals && (
            <section>
              <h3>Adicionais</h3>
              { menu.filter(item => item.type === 'additional').map(item => 
                <span 
                  key={item.id}
                  onClick={() => addAdditional(item)}
                >
                  {item.item}
                </span>
              )}
            </section>
          ) }

          <Orders products={products} setProducts={setProducts} value={value} setValue={setValue} />

          <button type='submit' onClick={(e) => handleSubmit(e)}>Enviar pedido</button>
        </form>)
      }
    </>
  )
}

export default NewOrder