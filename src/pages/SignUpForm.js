import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { createUser, addUserType } from '../services/FirebaseService'
import db from '../utils/firebaseUtils'

import Button from '../components/Input'
import Input from '../components/Input'

const SignUpForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('kitchen')
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    createUser(email, password)
    .then(async result => {
      const userId = result.user.uid

      await db.firestore().collection('users').doc(userId).set({
        type: userType
      }).then(() => history.push(userType))
    })
    .catch(error => console.error(error))
  }

  return (
    <>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <Input type='email' placeholder='Email' onChange={(event) => setEmail(event.target.value)} />
        <Input type='password' placeholder='Senha (mínimo 6 dígitos)' onChange={(event) => setPassword(event.target.value)} />
        <select defaultValue='kitchen' onChange={(event) => setUserType(event.target.value)} >
          <option value='kitchen'>Cozinha</option>
          <option value='hall'>Salão</option>
        </select>
        
        <Button type='submit' text='Cadastrar' />

      </form>
    </>
  )
}

export default SignUpForm