import db from '../utils/firebaseUtils'

export const getData = () => {
  const headers = { 'Authorization': localStorage.getItem('token') }

  return fetch('https://lab-api-bq.herokuapp.com/products', { headers })
    .then(response => response.json());
}

export const getOrders = () => {
  const headers = { 'Authorization': localStorage.getItem('token') }

  return fetch('https://lab-api-bq.herokuapp.com/orders', { headers })
    .then(response => response.json());
}

export const getReadyOrders = () => {
  return db
    .firestore()
    .collection('orders')
    .orderBy('finished', 'asc')
    .get()
    .then((result) => 
      result.docs.map(doc =>
        ({
          id: doc.id,
          ...doc.data()
        })
      )
    )
}

export const createUser = (email, password, role, restaurant) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      email,
      password,
      role,
      restaurant
    })
  };

  return fetch('https://lab-api-bq.herokuapp.com/users', requestOptions)
    .then(response => response.json());
}

export const createOrder = (client, table, products) => {
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
    body: JSON.stringify({
      client,
      table,
      products
    })
  };

  return fetch('https://lab-api-bq.herokuapp.com/orders', requestOptions)
    .then(response => response.json());
}

export const login = (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      email,
      password
    })
  };

  return fetch('https://lab-api-bq.herokuapp.com/auth', requestOptions)
    .then(response => response.json());
}

export const finishOrder = (orderId) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
    body: JSON.stringify({
      status: 'finished'
    })
  };

  return fetch(`https://lab-api-bq.herokuapp.com/orders/${orderId}`, requestOptions)
    .then(response => response.json());
}

export const deliverOrder = (orderId) => {
  return db.firestore().collection('orders').doc(orderId).update({ delivered: true })
}