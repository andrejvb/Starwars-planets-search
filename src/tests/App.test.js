import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from './MockData';


const URL_API = 'https://swapi.dev/api/planets';

beforeEach(() => {
  global.fetch = jest.fn(async () => ({
    json: async () => mockData,
  }));
})

describe('Testes StarWars', () => {
  it('Testa os botoes e os campos de busca', () => {
    render(<App />);
  const searchImput = screen.getByTestId('name-filter')
  expect(searchImput).toBeInTheDocument();
  const tabela = screen.getBy
  expect(tabela).toBeInTheDocument()
  expect(tabela).toHaveLength(10)
  })

});
