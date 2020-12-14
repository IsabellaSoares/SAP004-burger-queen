import React, { Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/RegisterForm'
import Login from './pages/LoginForm'

const Routes = () => (
  <Suspense fallback="Loading..." >
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/register" component={() => <Register />} />
        <Route exact path="/login" component={() => <Login />} />
      </Switch>
    </BrowserRouter>
  </Suspense>
)

export default Routes