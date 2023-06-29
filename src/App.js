import React from 'react'
import {BroswerRouter as Router, Route,Switch,Link} from 'react-router-dom';
import Home from './components/Home';
import CuisinePage from './components/CuisinePage';
import './App.css';

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
      <Switch>
        <Route path="/" component ={Home}/>
        <Route path="/cuisine" component={CuisinePage} />
      </Switch>
    </Router>
  );
}


export default App;
