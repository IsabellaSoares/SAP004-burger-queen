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

export const postUser = (email, password, type) => {
  db
  .firestore()
  .collection('users').add({
    email,
    password,
    type
  })
  .then(docRef => {
      console.log('Document written with ID: ', docRef.id);
  })
  .catch(error => {
      console.error('Error adding document: ', error);
  })
}