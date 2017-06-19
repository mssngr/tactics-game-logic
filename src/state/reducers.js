import {combineReducers} from 'redux'
import {characters} from 'state/reducers/characters'

const app = combineReducers({
  characters,
})

export default app
