import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const { planets, planetsFilt } = useContext(StarContext);
  const thePlanets = planetsFilt.length > 0 ? planetsFilt : planets;
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      { thePlanets && thePlanets.map((e) => (
        <tbody key={ e.name }>
          <tr>
            { Object.values(e).map((info) => (<td key={ info }>{info}</td>))}
          </tr>
        </tbody>
      ))}
    </table>
  );
}

export default Table;
