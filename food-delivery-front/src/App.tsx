import React from 'react';
import { Switch, Route } from 'react-router';
import Home from './Pages/Home';
import PersonalHome from './Pages/PersonalHome';
import Restaurant from './Pages/Restaurant';
import SearchFood from './Pages/SearchFood';
import SearchRestaurant from './Pages/SearchRestaurant';

function App() {
  return (
    <Switch>
      <Route exact path="/Home" component={Home} />
      <Route exact path="/Home/:Guest_ID" component={PersonalHome} />
      <Route exact path="/Home/:Guest_ID/search/restaurant" component={SearchRestaurant} />
      <Route exact path="/Home/:Guest_ID/search/food" component={SearchFood} />
      <Route exact path="/Restaurant/:Restaurant_ID/:Guest_ID" component={Restaurant} />
    </Switch>
  );
}

export default App;