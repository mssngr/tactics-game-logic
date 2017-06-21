import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import app from './reducers'

export const store = createStore(
  app,
  applyMiddleware(logger),
)
