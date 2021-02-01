import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { createUser } from '../services/FirebaseService'
// import db from '../utils/firebaseUtils'

import Button from '../components/Input'
import Input from '../components/Input'

const SignUpForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('kitchen')
  const [restaurant, setRestaurant] = useState('')
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    // createUser(email, password)
    // .then(async result => {
    //   const userId = result.user.uid

    //   await db.firestore().collection('users').doc(userId).set({
    //     type: userType
    //   }).then(() => history.push(userType))
    // })
    // .catch(error => console.error(error))

    createUser(email.toString(), password.toString(), role.toString(), restaurant.toString())
      .then(result => {
        localStorage.setItem('token', result.token);
        history.push(result.role);
      })
      .catch(error => console.log(error));
  }

  return (
    <>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <Input type='email' placeholder='Email' onChange={(event) => setEmail(event.target.value)} />
        <Input type='password' placeholder='Senha (mínimo 6 dígitos)' onChange={(event) => setPassword(event.target.value)} />
        <Input type='text' placeholder='Nome do restaurante' onChange={(event) => setRestaurant(event.target.value)} />
        <select defaultValue='kitchen' onChange={(event) => setRole(event.target.value)} >
          <option value='kitchen'>Cozinha</option>
          <option value='hall'>Salão</option>
        </select>
        
        <Button type='submit' text='Cadastrar' />

      </form>
    </>
  )
}

export default SignUpForm