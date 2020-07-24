import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store';
import { AppRouter } from './components/router';
import './App.css';
import { createStore, applyMiddleware  } from 'redux';

const store = createStore(
  rootReducer, applyMiddleware(thunk),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
