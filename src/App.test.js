import { render, screen } from '@testing-library/react';

import Home from './pages/Home'
import Login from './pages/LoginForm'
import Register from './pages/RegisterForm'

test('Home => renders homepage', () => {
  render(<Home />);
  const title = screen.getByText('Home');
  expect(title).toBeInTheDocument();
});

test('Register => renders register form', () => {
  render(<Register />);
  const title = screen.getByText('Cadastro');
  expect(title).toBeInTheDocument();
});

test('Login => renders login form', () => {
  render(<Login />);
  const title = screen.getByText('Login');
  expect(title).toBeInTheDocument();
});
