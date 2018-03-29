import thunkMiddleware from 'redux-thunk'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import App from './App'
import { fetchPosts } from './actions'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

let store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  )
)

store
  .dispatch(fetchPosts())
  .then(() => {console.log(store.getState())})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('breedBrowser')
)
