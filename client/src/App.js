import React, { Fragment } from 'react';
import './App.scss';
import Landing from './components/pages/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import UserState from './context/user/UserState';
import RoutineState from './context/routine/RoutineState';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';
import Auth from './components/auth/Auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import Routine from './components/routine/Routine';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <UserState>
      <RoutineState>
        <AlertState>
          <Router>
            <div className='App'>
              <Alerts />
              <Switch>
                <Route exact path='/' component={Auth} />
                <Fragment>
                  <Navbar />
                  <Route exact path='/about' component={About} />
                  <PrivateRoute exact path='/home' component={Landing} />
                  <PrivateRoute exact path='/routine/:id' component={Routine} />
                  {/* <Route component={NotFound} /> */}
                </Fragment>
              </Switch>
            </div>
          </Router>
        </AlertState>
      </RoutineState>
    </UserState>
  );
}

export default App;
