import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Popular from './Popular';
import Results from './Results';

export default () => {
  return (
    <Router>
      <div className="container">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/battle" component={Battle} />
          <Route exact path="/battle/results" component={Results} />
          <Route path="/popular" component={Popular} />
          <Route render={() => <p>Not Found</p>} />
        </Switch>
      </div>
    </Router>
  )
}
