import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { getData } from '../services/FirebaseService'

import Button from '../components/Button'

const Home = () => {
  let history = useHistory()

  useEffect(() => {
    console.log(getData('users', 'email', 'asc'))
  })

  return (
    <>
      <h1>Home</h1>
      <Button text='Cadastrar' onClick={() => history.push('register')} />
      <Button text='Entrar' onClick={() => history.push('login')} />
    </>
  )
}

export default Home