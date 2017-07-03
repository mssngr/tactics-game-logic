import {calcActions} from 'lib/combat/combat'
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
  console.log(`${player.name} ${player.action}s!`)
  console.log(`${enemy.name} ${enemy.action}s!`)
  return {
    type: TYPES.CALC_COMBAT,
    result: calcActions(player, enemy),
  }
}
