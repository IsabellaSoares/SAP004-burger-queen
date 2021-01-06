import db from '../utils/firebaseUtils'

export const getData = (collection) => {
  let results = []

  db
  .firestore()
  .collection(collection)
  .get()
  .then(async (result) => {
    await result
      .docs
      .forEach(doc => results
        .push({
          id: doc.id,
          ...doc.data()
        }))
  })

  return results
}

export const getOrders = () => {
  let results = []

  db
  .firestore()
  .collection('orders')
  .orderBy('date', 'asc')
  .get()
  .then(async (result) => {
    await result
      .docs
      .forEach(doc => results
        .push({
          id: doc.id,
          ...doc.data()
        }))
  })

  return results
}

export const createUser = (email, password) => {
  return db
        .auth()
        .createUserWithEmailAndPassword(email, password)
}

export const login = async (email, password, history) => {
  try {
    await db
    .auth()
    .signInWithEmailAndPassword(email, password)

    const userId = await db.auth().currentUser.uid

    db
    .firestore()
    .collection('users')
    .doc(userId)
    .get()
    .then((result) => {
      history.push(result.data().type)
    })
  } catch (error) {
    console.error(error)
    alert('Houve um erro ao tentar realizar o login')
  }
}

export const createOrder = (order) => {
  return db
        .firestore()
        .collection('orders')
        .add(order)
}