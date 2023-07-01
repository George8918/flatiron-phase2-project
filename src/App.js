import React from 'react'
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import CuisinePage from './components/CuisinePage';
import './App.css';
import './styles.css';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to ="/">Home</Link>
          </li>
          <li>
            <Link to = "/cuisine">Cuisine</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element ={<Home/>}/>
        <Route path="/cuisine" element={<CuisinePage/>} />
      </Routes>
    </Router>
  );
}


export default App;
