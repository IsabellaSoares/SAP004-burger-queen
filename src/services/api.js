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

export const updateOrder = (orderId, status) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
    body: JSON.stringify({
      status
    })
  };

  return fetch(`https://lab-api-bq.herokuapp.com/orders/${orderId}`, requestOptions)
    .then(response => response.json());
}