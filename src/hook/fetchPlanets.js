// import { useContext } from 'react';
// import StarContext from '../context/StarContext';

// const useFetchPlanets = () => {
//   const { planets, setPlanets } = useContext(StarContext);
//   //utilizar use state e nao use context
//   const fetchPlanets = () => {
//     fetch('https://swapi.dev/api/planets')
//       .then((response) => response.json())
//       .then((data) => {
//         data.forEach((planet) => delete planet.residents);
//         setPlanets(data);
//       });
//   };
//   return { planets, fetchPlanets };
// };

// export default useFetchPlanets;

const fetchPlanets = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    const { results } = await response.json();
    await results.forEach((planet) => delete planet.residents);
    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default fetchPlanets;
