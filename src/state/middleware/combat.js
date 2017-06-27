import {PLAYER_CHOICE, ENEMY_CHOICE, CALC_COMBAT} from '../actions/combatTypes'
import {calcDamage} from 'lib/combat'

export const calcCombatMiddleware = store => next => action => {
  if (action.type === CALC_COMBAT) {
    const player = store.getState().characters.player
    const enemy = store.getState().characters.enemy
    console.log(`${player.name} ${player.action}s!`)
    console.log(`${enemy.name} ${enemy.action}s!`)
    console.log(`${player.name} takes ${calcDamage(player, enemy).player} damage.`)
    console.log(`${enemy.name} takes ${calcDamage(player, enemy).enemy} damage.\n`)
  }
  return next(action)
}
