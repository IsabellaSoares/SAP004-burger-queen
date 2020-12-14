import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../components/Button'

const Home = () => {
  let history = useHistory()

  return (
    <>
      <h1>Home</h1>
      <Button text='Cadastrar' onClick={() => history.push('register')} />
      <Button text='Entrar' onClick={() => history.push('login')} />
    </>
  )
}

export default Home