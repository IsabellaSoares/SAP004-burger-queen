import React, { useState, useEffect, useCallback } from 'react'

import { getData } from '../services/FirebaseService'

import Orders from '../components/Orders'

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

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    setMenu(getData('menu'))
    setLoading(false)
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
    let copy = products

    copy.push({
      id: products.length,
      item: item.item,
      price: item.price
    })

    setProducts(copy)
    forceUpdate()
  }

  return (
    <>
      <h1>New Order Page</h1>
      {
        loading ? <h3>Carregando cardápio...</h3> :
        (<main>
          <div>
            <label htmlFor='name'>Nome</label>
            <input type='text' name='name' id='name' value='' onChange={event => setName(event.target.value)} />
          </div>

          <div>
            <label htmlFor='table'>Mesa</label>
            <input type='text' name='table' id='table' value='' onChange={event => setTable(event.target.value)} />
          </div>

          <button onClick={() => handleMenuChange(false, 'breakfast')}>Café da manhã</button>
          <button onClick={() => handleMenuChange(true, [])}>Almoço e Jantar</button>

          { showDinnerMenu && 
            (<section>
              <button onClick={() => handleShowOptionsChange(true, 'hamburguer')}>Hamburgueres</button>
              <button onClick={() => handleShowOptionsChange(false, 'side_diches')}>Acompanhamentos</button>
              <button onClick={() => handleShowOptionsChange(false, 'drink')}>Bebidas</button>
            </section>)
          }

          { activeMenu.map(item => 
            <button 
              key={item.id} 
              onClick={() => addProduct(item)}
            >
              {item.item}
            </button>
          )}
        
          { showOptions && (
            <>
              <h3>Selecione o tipo da carne</h3>
              <button onClick={() => addProduct({ item: 'Carne bovina', price: 0 })}>Carne bovina</button>
              <button onClick={() => addProduct({ item: 'Carne de frango', price: 0 })}>Carne de frango</button>
              <button onClick={() => addProduct({ item: 'Vegetariano', price: 0 })}>Vegetariano</button>
            </>
          ) }

          { showAdditionals && (
            <>
              <h3>Adicionais</h3>
              { menu.filter(item => item.type === 'additional').map(item => 
                <button 
                  key={item.id}
                  onClick={() => addProduct(item)}
                >
                  {item.item}
                </button>
              )}
            </>
          ) }

          <Orders products={products} setProducts={setProducts} />
        </main>)
      }
    </>
  )
}

export default NewOrder