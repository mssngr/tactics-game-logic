import {PLAYER_CHOICE, ENEMY_CHOICE, COMBAT_ROUND} from '../actions/combatTypes'

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

export function calcCombat() {
  return {
    type: COMBAT_ROUND,
  }
}
