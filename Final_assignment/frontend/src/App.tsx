import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const user = useAppSelector(selectUser);

  const UnAuthApp = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  };

  const AuthApp = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  };

  return (
    <div className="App">
       <Link to="/p1">P1</Link> | 
    </div>
  );
}

export default App;
