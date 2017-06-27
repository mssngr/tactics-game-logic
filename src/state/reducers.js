import {combineReducers} from 'redux'
import {characters} from 'state/reducers/characters'
import {combat} from 'state/reducers/combat'

const app = combineReducers({
  characters,
  combat,
})

export default app
