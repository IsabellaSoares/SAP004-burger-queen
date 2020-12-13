import React, { useState } from 'react'

import Button from '../components/Input'
import Input from '../components/Input'

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(email, password, userType)
  }

  return (
    <>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <Input type='email' placeholder='Email' onChange={(event) => setEmail(event.target.value)} />
        <Input type='password' placeholder='Senha' onChange={(event) => setPassword(event.target.value)} />
        <select value={userType} onChange={(event) => setUserType(event.target.value)} >
          <option value="cozinha">Cozinha</option>
          <option value="salao">Salão</option>
        </select>
        
        <Button type='submit' text='Cadastrar' />

      </form>
    </>
  )
}

export default RegisterForm