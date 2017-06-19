import {store} from 'state/store'
import {playerChoice, enemyChoice, calcCombat} from 'state/actions/combatActions'
import {COMBAT_CHOICES} from 'lib/combat'

const {A, C, T, B, R} = COMBAT_CHOICES

// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => {
  if (store.getState().characters.player.action && store.getState().characters.enemy.action) {
    return store.dispatch(calcCombat())
  }
  return console.log(store.getState())
})

// Dispatch some actions
store.dispatch(enemyChoice(A))
store.dispatch(playerChoice(A))

// Stop listening to state updates
unsubscribe()
