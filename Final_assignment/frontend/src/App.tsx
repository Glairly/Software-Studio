import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/p1">P1</Link> | 
        <Link to="/p1">P2</Link>  
      </header>


    </div>
  );
}

export default App;
