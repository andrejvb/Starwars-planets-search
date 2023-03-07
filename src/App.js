import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import TextFilter from './components/TextFilter';
import StarProvider from './context/StarProvider';

function App() {
  return (
    <StarProvider>
      <TextFilter />
      <Filters />
      <Table />
    </StarProvider>
  );
}

export default App;
