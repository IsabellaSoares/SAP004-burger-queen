import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { login } from '../services/FirebaseService'

import Button from '../components/Input'
import Input from '../components/Input'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()
    login(email, password)
      .then(result => {
        localStorage.setItem('token', result.token);
        history.push(result.role);
      })
      .catch((error) => {
        console.error(error)
        alert('Houve um erro ao tentar realizar o login')
      })
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input type='email' placeholder='Email' onChange={(event) => setEmail(event.target.value)} />
        <Input type='password' placeholder='Senha' onChange={(event) => setPassword(event.target.value)} />
        
        <Button type='submit' text='Entrar' />
      </form>
    </>
  )
}

export default LoginForm