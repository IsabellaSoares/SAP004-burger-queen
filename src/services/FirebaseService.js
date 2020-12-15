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

export const createUser = async (email, password, type) => {
  db
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .catch(error => {
      return error
  })

  return 'Sucesso'
}

export const addUserType = async (user, type) => {
  try {
    db
    .firestore()
    .collection('user_types')
    .add({
      user,
      type
    })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}