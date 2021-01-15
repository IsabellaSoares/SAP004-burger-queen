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

export const createUser = (email, password) => {
  return db.auth().createUserWithEmailAndPassword(email, password)
}

export const createOrder = (order) => {
  return db.firestore().collection('orders').add(order)
}

export const login = async (email, password, history) => {
  try {
    await db.auth().signInWithEmailAndPassword(email, password)

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

export const startOrder = (orderId) => {
  return db.firestore().collection('orders').doc(orderId).update({ updatedAt: new Date() })
}

export const finishOrder = (orderId) => {
  return db
    .firestore()  
    .collection('orders').doc(orderId).update({
      finished: new Date(),
    })
}