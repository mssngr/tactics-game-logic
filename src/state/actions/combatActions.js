import {calcDamage} from 'lib/combat'
import * as TYPES from '../actions/combatTypes'

export function startCombat() {
  return {
    type: TYPES.START_COMBAT,
  }
}

export function endCombat() {
  return {
    type: TYPES.END_COMBAT,
  }
}

export function playerChoice(actionChoice) {
  return {
    type: TYPES.PLAYER_CHOICE,
    choice: actionChoice,
  }
}

export function enemyChoice(actionChoice) {
  return {
    type: TYPES.ENEMY_CHOICE,
    choice: actionChoice,
  }
}

export function calcCombat(player, enemy) {
  return {
    type: TYPES.CALC_COMBAT,
    damage: calcDamage(player, enemy),
  }
}
