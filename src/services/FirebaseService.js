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
  try {
    db
    .auth()
    .createUserWithEmailAndPassword(email, password)
    
    return 'Sucesso'
  } catch (error) {
    return error
  }
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

export const login = async (email, password, history) => {
  try {
    await db
    .auth()
    .signInWithEmailAndPassword(email, password)

    const userId = await db.auth().currentUser.uid

    db
    .firestore()
    .collection('user_types')
    .where('user', '==', userId)
    .get()
    .then(async (result) => {
      if (result.docs.length === 0) {
        alert('Usuário não encontrado')
        return
      }

      await result
        .docs
        .forEach(doc => history.push(doc.data().type))
      })
    } catch (error) {
      console.error(error)
      alert('Houve um erro ao tentar realizar o login')
    }
}