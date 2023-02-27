import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import fetchPlanets from '../hook/fetchPlanets';

function StarProvider({ children }) {
  const [planets, setPlanets] = useState();
  const [textFilter, setTextFilter] = useState('');
  const [planetsFilt, setPlanetFilt] = useState([]);

  const getPlanets = async () => {
    const planetsList = await fetchPlanets();
    setPlanets(planetsList);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  useEffect(() => {
    const planetsFiltered = textFilter.length > 0 ? planets
      .filter((planet) => planet.name.toLowerCase().includes(textFilter)) : [];
    setPlanetFilt(planetsFiltered);
  }, [textFilter, planets]);

  const Contextvalue = { planets, planetsFilt, setTextFilter, textFilter };

  return (
    <StarContext.Provider value={ Contextvalue }>{children}</StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarProvider;
