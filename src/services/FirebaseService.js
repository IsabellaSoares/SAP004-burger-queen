import db from '../utils/firebaseUtils'

export const getData = (collection, orderField, order) => {
  let results = []

  db
  .firestore()
  .collection(collection)
  .orderBy(orderField, order)
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