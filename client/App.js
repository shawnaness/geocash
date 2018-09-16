import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Welcome from './Welcome';
import MoneyMap from './MoneyMap';


const App = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Welcome}/>
      <Route path='/map' component={MoneyMap}/>
    </Switch>
  </main>
)

export default App;
