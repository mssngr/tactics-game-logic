import readlineSync from 'readline-sync'
import random from 'lodash.random'
import * as WEAPONS from 'lib/weapons'
import {PLAYER_CHOICE, ENEMY_CHOICE, CALC_COMBAT} from '../actions/combatTypes'
import {COMBAT_CHOICES, SWORD_ATTACKS, calcDamage} from 'lib/combat'

export const calcCombatMiddleware = store => next => action => { // eslint-disable-line fp/no-nil
  const player = store.getState().characters.player
  const enemy = store.getState().characters.enemy
  switch (action.type) {

    case PLAYER_CHOICE:
      if (action.choice === COMBAT_CHOICES.A && player.weapon === WEAPONS.SWORD) {
        return next({
          ...action,
          attackType: readlineSync.keyInSelect(SWORD_ATTACKS, 'How do you want to attack?'),
        })
      }
      return next(action)

    case ENEMY_CHOICE:
      if (action.choice === COMBAT_CHOICES.A && enemy.weapon === WEAPONS.SWORD) {
        return next({
          ...action,
          attackType: SWORD_ATTACKS[random(0, 1)],
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
}
