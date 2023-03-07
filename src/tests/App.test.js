import React from 'react';
import { fireEvent, getAllByRole, render, screen } from '@testing-library/react';
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
  it('Renderização da tabela e campo de busca pelo nome', async () => {
    render(<App />);
  const searchInput = screen.getByTestId('name-filter')
  expect(searchInput).toBeInTheDocument();
  const firstColumnheader = screen.getByRole('columnheader', { name: /name/i })
  expect(firstColumnheader).toBeInTheDocument()
  const lastColumnheader = screen.getByRole('columnheader', { name: /population/i })
  expect(lastColumnheader).toBeInTheDocument()
  const firstPlanet = await screen.findByRole('cell', { name: /tatooine/i })
  expect(firstPlanet).toBeInTheDocument()
  const lastPlanet = await screen.findByRole('cell', { name: /kamino/i })
  expect(lastPlanet).toBeInTheDocument()
  userEvent.type( searchInput,'Bespin')
  expect(firstPlanet).not.toBeInTheDocument()
  expect(lastPlanet).not.toBeInTheDocument()
  const bespin = screen.getByRole('cell', { name: /bespin/i })
  expect(bespin).toBeInTheDocument()
  const thirteenCellsOnePlanet = screen.getAllByRole('cell')
  expect(thirteenCellsOnePlanet).toHaveLength(13)
  userEvent.clear(searchInput)
  userEvent.type( searchInput,'H')  
  expect(bespin).not.toBeInTheDocument()
  expect(firstPlanet).not.toBeInTheDocument()
  expect(lastPlanet).not.toBeInTheDocument()
  const twentySixCellsTwoPlanet = screen.getAllByRole('cell')
  expect(twentySixCellsTwoPlanet).toHaveLength(26)
  })
  it('Testa population maior que 100000000000', async () => {
    render(<App />)
    const firstPlanet = await screen.findByRole('cell', { name: /tatooine/i })
    expect(firstPlanet).toBeInTheDocument()
    const numericInput = screen.getByTestId('value-filter')
    userEvent.type(numericInput, '100000000000')
    const filterButton = screen.getByTestId('button-filter')
    userEvent.click(filterButton)
    const coruscan = screen.getByRole('cell', { name: /coruscan/i })
    expect(coruscan).toBeInTheDocument()
    expect(firstPlanet).not.toBeInTheDocument()
    const thirteenCellsOnePlanet = screen.getAllByRole('cell')
    expect(thirteenCellsOnePlanet).toHaveLength(13)
  })
  it('Testa diametro menor que 7500 e remove all filters', async () => {
    render(<App />)
    const lastPlanet = await screen.findByRole('cell', { name: /kamino/i })
    expect(lastPlanet).toBeInTheDocument()
    const colunm = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter')
    userEvent.selectOptions(colunm, 'diameter')
    userEvent.selectOptions(comparison, 'menor que')
    const numericInput = screen.getByTestId('value-filter')
    userEvent.type(numericInput, '7500')    
    const filterButton = screen.getByTestId('button-filter')
    userEvent.click(filterButton)
    expect(lastPlanet).not.toBeInTheDocument()
    const hoth = screen.getByRole('cell', { name: /hoth/i })
    expect(hoth).toBeInTheDocument()
    const endor = screen.getByRole('cell', { name: /endor/i })
    expect(endor).toBeInTheDocument()
    const filter = screen.getByTestId('filter')
    expect(filter).toBeInTheDocument() 
    const removeFilters = screen.getByTestId('button-remove-filters')
    userEvent.click(removeFilters)    
    expect(filter).not.toBeInTheDocument() 
    const firstPlanet = screen.getByRole('cell', { name: /tatooine/i })
    expect(firstPlanet).toBeInTheDocument()
  })
});
