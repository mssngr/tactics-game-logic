import {CALC_COMBAT} from '../actions/combatTypes'

export const calcCombatMiddleware = store => next => action => { // eslint-disable-line fp/no-nil
  const player = store.getState().characters.player
  const enemy = store.getState().characters.enemy
  switch (action.type) {

    case CALC_COMBAT:
      console.log(`${player.name} ${player.action}s!`)
      console.log(`${enemy.name} ${enemy.action}s!`)
      console.log(`${player.name} takes unknown? damage.`)
      console.log(`${enemy.name} takes unknown? damage.\n`)
      return next(action)

    default:
      return next(action)

  }
}
