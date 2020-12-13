import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../components/Button'

const Home = () => {
  let history = useHistory()

  return (
    <>
      <Button text='Cadastrar' onClick={() => history.push('register')} />
      <Button text='Entrar' onClick={() => history.push('login')} />
    </>
  )
}

export default Home