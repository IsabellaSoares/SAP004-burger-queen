import React, { useState } from 'react'

import Button from '../components/Input'
import Input from '../components/Input'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(email, password)
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