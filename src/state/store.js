import {applyMiddleware, createStore} from 'redux'
import app from './reducers'
import {calcCombatMiddleware} from 'state/middleware/combat'

export const store = createStore(
  app,
  applyMiddleware(calcCombatMiddleware),
)
