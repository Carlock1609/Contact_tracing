import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
// import Index from './components/layout/Index';

// REDUX 
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

// checks to see if token is verified
if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => { 
  // hook*****
  // useEffect will keep running and be a constant loop anytimes the state changes
  // This is checking the auth of the user
  // adding the emprty-array as another param makes it only run once
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container-fluid'>
            {/* These are the routes - Depending on what the client requests, determines which one gets execxuted. */}
            {/* The Routes are components, They work a lot like partials in express or base django*/}
            {/* 'Switch' can only hold routes.  */}
            <Alert />
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register}/>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
};

export default App;
