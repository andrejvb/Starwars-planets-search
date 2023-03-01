import React, { useContext } from 'react';
import StarContext from '../context/StarContext';
import './TextFilter.css';

function TextFilter() {
  const { setTextFilter } = useContext(StarContext);
  return (
    <div>
      <label className="search" htmlFor="filter-text">
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
