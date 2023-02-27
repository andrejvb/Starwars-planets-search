import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import fetchPlanets from '../hook/fetchPlanets';

function StarProvider({ children }) {
  const [planets, setPlanets] = useState();

  const getPlanets = async () => {
    const planetsList = await fetchPlanets();
    setPlanets(planetsList);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const Contextvalue = { planets };

  return (
    <StarContext.Provider value={ Contextvalue }>{children}</StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarProvider;
