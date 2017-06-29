import {store} from 'state/store'
import {combatMessage} from 'state/actions/combatActions'

export function msg(message) {
  return store.dispatch(combatMessage(message))
}
