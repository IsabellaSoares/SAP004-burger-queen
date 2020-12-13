import React, { Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Home = React.lazy(() => import('./pages/Home'))
const Register = React.lazy(() => import('./pages/RegisterForm'))
const Login = React.lazy(() => import('./pages/LoginForm'))

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