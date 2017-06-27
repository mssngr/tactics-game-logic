import {store} from 'state/store'
import {combat} from 'lib/combat'
import * as combatActions from 'state/actions/combatActions'

// Note that subscribe() returns a function for unregistering the listener
/* eslint-disable fp/no-nil, consistent-return */
const unsubscribe = store.subscribe(() => {
  const {inCombat} = store.getState().combat
  if (inCombat) {
    return combat()
  }
})
/* eslint-enable fp/no-nil, consistent-return */

store.dispatch(combatActions.startCombat())

// Stop listening to state updates
unsubscribe()
