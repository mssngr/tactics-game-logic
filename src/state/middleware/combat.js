import readlineSync from 'readline-sync'
import random from 'lodash.random'
import {PLAYER_CHOICE, ENEMY_CHOICE, CALC_COMBAT} from '../actions/combatTypes'
import {COMBAT_CHOICES, ATTACK_TYPES, calcDamage} from 'lib/combat'

export const calcCombatMiddleware = store => next => action => {
  const player = store.getState().characters.player
  const enemy = store.getState().characters.enemy
  switch (action.type) {

    case PLAYER_CHOICE:
      if (action.choice === COMBAT_CHOICES.A) {
        return next({
          ...action,
          attackType: readlineSync.keyInSelect(ATTACK_TYPES, 'How do you want to attack?'),
        })
      }
      return next(action)

    case ENEMY_CHOICE:
      if (action.choice === COMBAT_CHOICES.A) {
        return next({
          ...action,
          attackType: ATTACK_TYPES[random(0, 2)],
        })
      }
      return next(action)

    case CALC_COMBAT:
      console.log(`${player.name} ${player.action}s!`)
      console.log(`${enemy.name} ${enemy.action}s!`)
      console.log(`${player.name} takes ${calcDamage(player, enemy).player} damage.`)
      console.log(`${enemy.name} takes ${calcDamage(player, enemy).enemy} damage.\n`)
      return next(action)

    default:
      return next(action)

  }
  return next(action)
}
