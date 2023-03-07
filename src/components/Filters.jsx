import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function Filters() {
  const { optionsColumn,
    filters,
    setFilters,
    selectedFilters,
    setSelectedFilters,
    setoptionsColumn,
    optionsColumnArray } = useContext(StarContext);

  return (
    <div>
      <select
        data-testid="column-filter"
        name="column"
        value={ filters.column }
        onChange={ ({ target }) => setFilters({ ...filters, column: target.value }) }
      >
        {optionsColumn.map((option) => (
          <option key={ option } value={ option }>
            { option }
          </option>
        ))}
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ filters.comparison }
        onChange={ ({ target }) => setFilters({ ...filters, comparison: target.value }) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        name="value"
        data-testid="value-filter"
        value={ filters.value }
        onChange={ ({ target }) => setFilters({ ...filters, value: target.value }) }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          setSelectedFilters([...selectedFilters, filters]);
          setoptionsColumn(optionsColumn.filter((a) => a !== filters.column));
          setFilters({
            ...filters,
            column: optionsColumn
              .filter((a) => a !== filters.column)[0] });
        } }
      >
        Filtrar
      </button>
      <button
        data-testid="button-remove-filters"
        onClick={ () => {
          setSelectedFilters([]);
          setoptionsColumn(optionsColumnArray);
        } }
      >
        Remove All
      </button>

      {selectedFilters.map((filter, index) => (
        <div data-testid="filter" key={ index }>
          <button
            onClick={ () => {
              const cloneArray = [...selectedFilters];
              cloneArray.splice(index, 1);
              setSelectedFilters(cloneArray);
              console.log(cloneArray);
            } }
          >
            𝙭
          </button>
          <span>
            { filter.column }
            { filter.condition }
            { filter.value }
          </span>
        </div>
      ))}

    </div>
  );
}

export default Filters;
