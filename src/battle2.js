import readlineSync from 'readline-sync'
import {store} from 'state/store'
import {playerChoice, enemyChoice, calcCombat} from 'state/actions/combatActions'
import {COMBAT_CHOICES, COMBAT_ACTIONS} from 'lib/combat'

const {A, C, T, B, R} = COMBAT_CHOICES
function playerAction() {
  return readlineSync.keyInSelect(COMBAT_ACTIONS, 'What do you choose to do?')
}

// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
/* eslint-disable fp/no-nil, consistent-return */
const unsubscribe = store.subscribe(() => {
  const player = store.getState().characters.player
  const enemy = store.getState().characters.enemy

  if (player.action && enemy.action) {
    return store.dispatch(calcCombat(player, enemy))
  }
})
/* eslint-enable fp/no-nil, consistent-return */

// Dispatch some actions
store.dispatch(enemyChoice(A))
store.dispatch(playerChoice(COMBAT_ACTIONS[playerAction()]))

// Stop listening to state updates
unsubscribe()
