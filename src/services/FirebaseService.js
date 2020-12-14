import db from '../utils/firebaseUtils'

const getData = (collection, orderField, order) => {
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

export default getData