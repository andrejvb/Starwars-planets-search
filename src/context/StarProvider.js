import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import fetchPlanets from '../hook/fetchPlanets';

function StarProvider({ children }) {
  const optionsColumnArray = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const [planets, setPlanets] = useState();
  const [textFilter, setTextFilter] = useState('');
  const [planetsFilt, setPlanetFilt] = useState([]);
  const [optionsColumn, setoptionsColumn] = useState(optionsColumnArray);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filters, setFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0 });

  const getPlanets = async () => {
    const planetsList = await fetchPlanets();
    setPlanets(planetsList);
    setPlanetFilt(planetsList);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  // useEffect(() => {
  //   const planetsFiltered = textFilter.length > 0 ? planets
  //     .filter((planet) => planet.name.toLowerCase()
  //       .includes(textFilter.toLowerCase())) : [];
  //   setPlanetFilt(planetsFiltered);
  // }, [textFilter, planets]);

  useEffect(() => {
    const planetsNameFilt = planets?.filter((planetas) => {
      const planetasFiltrados = selectedFilters.map(({ column, comparison, value }) => {
        switch (comparison) {
        case 'maior que':
          return Number(planetas[column]) > Number(value);
        case 'menor que':
          return Number(planetas[column]) < Number(value);
        case 'igual a':
          return Number(planetas[column]) === Number(value);
        default:
          return null;
        }
      });
      return planetasFiltrados.every((e) => e);
    });
    setPlanetFilt(planetsNameFilt);
  }, [selectedFilters, planets]);

  // const tratarDados = () => {
  //   const planetsNameFilt = planets.filter((planet) => planet.name.toLowerCase()
  //     .includes(textFilter.toLowerCase()));

  //   const filteredByNameNCoditions = planetsNameFilt.filter((planetas) => {
  //     const planetasFiltrados = selectedFilters.map(({ column, comparison, value }) => {
  //       switch (comparison) {
  //       case 'maior que':
  //         return Number(planetas[column]) > Number(value);
  //       case 'menor que':
  //         return Number(planetas[column]) < Number(value);
  //       case 'igual a':
  //         return Number(planetas[column]) === Number(value);
  //       default:
  //         return null;
  //       }
  //     });
  //     return planetasFiltrados.every((e) => e);
  //   });
  //   setPlanetFilt(filteredByNameNCoditions);
  //   return filteredByNameNCoditions;
  // };

  const Contextvalue = {
    planets,
    planetsFilt,
    setTextFilter,
    textFilter,
    optionsColumn,
    setoptionsColumn,
    filters,
    setFilters,
    selectedFilters,
    setSelectedFilters };

  return (
    <StarContext.Provider value={ Contextvalue }>{children}</StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarProvider;
