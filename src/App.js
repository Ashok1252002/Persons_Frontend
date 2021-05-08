import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import store from './store'
import Form from './components/Form';
import './App.css';
import Users from './components/Users/Users';

const  App = () => {
  return (
    <Provider store = {store}> 
    <Fragment>
      <Form />
      <div>
        <Users/>
      </div>
    </Fragment>
    </Provider>
  );
}

export default App;
