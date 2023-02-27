import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function TextFilter() {
  const { setTextFilter } = useContext(StarContext);
  return (
    <div>
      <label htmlFor="filter-text">
        <input
          type="text"
          name="filter-text"
          data-testid="name-filter"
          onChange={ (e) => setTextFilter(e.target.value) }
        />
      </label>
    </div>
  );
}

export default TextFilter;
