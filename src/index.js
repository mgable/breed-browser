//import thunkMiddleware from 'redux-thunk'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga  from './sagas.js'
import reducers from './reducers'
import App from './App'
import './registerServiceWorker';
import './index.css';


const sagaMiddleware = createSagaMiddleware();

let store = createStore(
  reducers,
  applyMiddleware(
    sagaMiddleware
  )
)

// store
//   .dispatch(FetchPosts())
//   .then(() => {console.log(store.getState())})

sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('breedBrowser')
)
