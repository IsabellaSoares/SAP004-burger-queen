import React, { Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import SignUp from './pages/SignUpForm'
import Login from './pages/LoginForm'
import Kitchen from './pages/Kitchen'
import Hall from './pages/Hall'

const Routes = () => (
  <Suspense fallback="Loading..." >
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/signup" component={() => <SignUp />} />
        <Route exact path="/login" component={() => <Login />} />
        <Route exact path="/kitchen" component={() => <Kitchen />} />
        <Route exact path="/hall" component={() => <Hall />} />
      </Switch>
    </BrowserRouter>
  </Suspense>
)

export default Routes