import db from '../utils/firebaseUtils'

export const getData = (collection) => {
  return db
    .firestore()
    .collection(collection)
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

export const getOrders = () => {
  return db
    .firestore()
    .collection('orders')
    .orderBy('createdAt', 'asc')
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
  // return db.auth().createUserWithEmailAndPassword(email, password)

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

export const createOrder = (order) => {
  return db.firestore().collection('orders').add(order)
}

export const login = (email, password) => {
  // try {
    // await db.auth().signInWithEmailAndPassword(email, password)

    // const userId = await db.auth().currentUser.uid

    // db
    // .firestore()
    // .collection('users')
    // .doc(userId)
    // .get()
    // .then((result) => {
    //   history.push(result.data().type)
    // })

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
  // } catch (error) {
  //   console.error(error)
  //   alert('Houve um erro ao tentar realizar o login')
  // }
}

export const startOrder = (orderId) => {
  return db.firestore().collection('orders').doc(orderId).update({ updatedAt: new Date() })
}

export const finishOrder = (orderId) => {
  return db.firestore().collection('orders').doc(orderId).update({ finished: new Date() })
}

export const deliverOrder = (orderId) => {
  return db.firestore().collection('orders').doc(orderId).update({ delivered: true })
}