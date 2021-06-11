import React, { createContext, useReducer } from 'react';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';
import './App.css';

import { initialState, reducer } from '../src/reducer/useReducer';

// contextAPI 
export const UserContext = createContext();

const Routing = () =>{
  return(
    <Switch>
          <Route exact path='/' component={Home} /> 
          <Route exact path='/dashboard' component={Dashboard} /> 
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/logout' component={Logout} />
          <Route component={Errorpage}></Route>
      </Switch>
  )
}

const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
  
    return (
      <>
      <UserContext.Provider value={{state, dispatch}}>
        <Navbar/>
        <Routing />
      </UserContext.Provider> 
      </>
    )
  }
  
  export default App
