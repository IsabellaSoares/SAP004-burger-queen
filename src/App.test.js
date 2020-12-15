import { render, screen } from '@testing-library/react';

import Home from './pages/Home'
import Login from './pages/LoginForm'
import SignUp from './pages/SignUpForm'

test('Home => renders homepage', () => {
  render(<Home />);
  const title = screen.getByText('Home');
  expect(title).toBeInTheDocument();
});

test('SignUp => renders sign up form', () => {
  render(<SignUp />);
  const title = screen.getByText('Cadastro');
  expect(title).toBeInTheDocument();
});

test('Login => renders login form', () => {
  render(<Login />);
  const title = screen.getByText('Login');
  expect(title).toBeInTheDocument();
});
