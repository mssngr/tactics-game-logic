import {calcDamage} from 'lib/combat'
import {PLAYER_CHOICE, ENEMY_CHOICE, CALC_COMBAT} from '../actions/combatTypes'

export function playerChoice(actionChoice) {
  return {
    type: PLAYER_CHOICE,
    choice: actionChoice,
  }
}

export function enemyChoice(actionChoice) {
  return {
    type: ENEMY_CHOICE,
    choice: actionChoice,
  }
}

export function calcCombat(player, enemy) {
  const damage = calcDamage(player, enemy)
  return {
    type: CALC_COMBAT,
    damage: damage,
  }
}
