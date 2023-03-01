import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import TextFilter from './components/TextFilter';

function App() {
  return (
    <div>
      <TextFilter />
      <Filters />
      <Table />
    </div>
  );
}

export default App;
