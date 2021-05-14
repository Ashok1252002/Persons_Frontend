import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import store from './store'
import AddForm from './components/Forms/AddForm';
import './App.css';
import Users from './components/Users/Users';

const  App = () => {
  return (
    <Provider store = {store}> 
    <Fragment>
      <AddForm />
      <div>
        <Users/>
      </div>
    </Fragment>
    </Provider>
  );
}

export default App;
