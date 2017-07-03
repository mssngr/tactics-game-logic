import {CALC_COMBAT} from '../actions/combatTypes'

export const calcCombatMiddleware = store => next => action => { // eslint-disable-line fp/no-nil
  const player = store.getState().characters.player
  const enemy = store.getState().characters.enemy
  switch (action.type) {

    case CALC_COMBAT:
      if (action.player.damage) {
        console.log(`${player.name} takes ${action.player.damage} damage.`)
      }
      if (action.player.condition) {
        console.log(`${player.name} is now ${action.player.condition}.`)
      }
      if (action.player.status) {
        console.log(`${player.name} is ${action.player.status}.`)
      }
      if (action.enemy.damage) {
        console.log(`${enemy.name} takes ${action.enemy.damage} damage.`)
      }
      if (action.enemy.condition) {
        console.log(`${enemy.name} is now ${action.enemy.condition}.`)
      }
      if (action.enemy.status) {
        console.log(`${enemy.name} is ${action.enemy.status}.`)
      }
      return next(action)

    default:
      return next(action)

  }
}
