import random from 'lodash.random'
import readlineSync from 'readline-sync'
import {store} from 'state/store'
import * as combatActions from 'state/actions/combatActions'

export const COMBAT_ACTIONS = [
  'Attack',
  'Counter',
  'Trip',
  'Block',
  'Retreat',
]

export const COMBAT_CHOICES = {
  A: COMBAT_ACTIONS[0],
  C: COMBAT_ACTIONS[1],
  T: COMBAT_ACTIONS[2],
  B: COMBAT_ACTIONS[3],
  R: COMBAT_ACTIONS[4],
}

const {A, C, T, B, R} = COMBAT_CHOICES

export function combat() {
  const {player, enemy} = store.getState().characters
  function playerAction() {
    return readlineSync.keyInSelect(COMBAT_ACTIONS, 'What do you choose to do?')
  }
  if (player.health <= 0) {
    console.log('You have died...')
    return store.dispatch(combatActions.endCombat())
  }
  if (enemy.health <= 0) {
    console.log('You killed the enemy!')
    return store.dispatch(combatActions.endCombat())
  }
  if (player.action && enemy.action) {
    return store.dispatch(combatActions.calcCombat(player, enemy))
  }
  if (!enemy.action) {
    console.log(`${player.name} has ${player.health} health.`)
    console.log(`${enemy.name} has ${enemy.health} health.`)
    return store.dispatch(combatActions.enemyChoice(COMBAT_ACTIONS[random(0, 4)]))
  }
  if (!player.action) {
    return store.dispatch(combatActions.playerChoice(COMBAT_ACTIONS[playerAction()]))
  }
  return console.log('ERROR: something went wrong with the combat function')
}

function positiveOnly(number) {
  if (number < 0) {
    return 0
  }
  return number
}

function playerTakesDmg(player, enemy) {
  const playerDamage = positiveOnly(enemy.weapon.rating - player.armor.rating)
  return {
    player: playerDamage,
    enemy: 0,
  }
}

function enemyTakesDmg(player, enemy) {
  const enemyDamage = positiveOnly(player.weapon.rating - enemy.armor.rating)
  return {
    player: 0,
    enemy: enemyDamage,
  }
}

function bothTakeDmg(player, enemy) {
  const playerDamage = positiveOnly(enemy.weapon.rating - player.armor.rating)
  const enemyDamage = positiveOnly(player.weapon.rating - enemy.armor.rating)
  return {
    player: playerDamage,
    enemy: enemyDamage,
  }
}

function attackVsBlock(player, enemy) {
  const enemyDamage = positiveOnly(player.weapon.rating - enemy.armor.rating - enemy.weapon.rating)
  return {
    player: 0,
    enemy: enemyDamage,
  }
}

function blockVsAttack(player, enemy) {
  const playerDamage = positiveOnly(enemy.weapon.rating - player.armor.rating - player.weapon.rating) // eslint-disable-line max-len
  return {
    player: playerDamage,
    enemy: 0,
  }
}

function playerAttacks(player, enemy) { // eslint-disable-line fp/no-nil
  switch (enemy.action) {

    case A: {
      return bothTakeDmg(player, enemy)
    }

    case C: {
      return playerTakesDmg(player, enemy)
    }

    case B: {
      return attackVsBlock(player, enemy)
    }

    case T:
    case R: {
      return enemyTakesDmg(player, enemy)
    }

    default:
      // Return zero damage for both.
      return {
        player: 0,
        enemy: 0,
      }

  }
}

function enemyAttacks(player, enemy) { // eslint-disable-line fp/no-nil
  switch (player.action) {

    case A: {
      return bothTakeDmg(player, enemy)
    }

    case C: {
      return enemyTakesDmg(player, enemy)
    }

    case B: {
      return blockVsAttack(player, enemy)
    }

    case T:
    case R: {
      return playerTakesDmg(player, enemy)
    }

    default:
      // Return zero damage for both.
      return {
        player: 0,
        enemy: 0,
      }

  }
}

export function calcDamage(player, enemy) {
  if (player.action === A) {
    return playerAttacks(player, enemy)
  }
  if (enemy.action === A) {
    return enemyAttacks(player, enemy)
  }
  // Return zero damage for both.
  return {
    player: 0,
    enemy: 0,
  }
}
