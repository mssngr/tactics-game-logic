import random from 'lodash.random'
import Chance from 'chance'
import readlineSync from 'readline-sync'
import {store} from 'state/store'
import {endCombat, calcCombat, enemyChoice, playerChoice} from 'state/actions/combatActions'
import {msg} from 'lib/utils'

const chance = new Chance()

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

export const ATTACK_TYPES = {
  CUT: 'cut',
  PIERCE: 'pierce',
  BASH: 'bash',
}

export function combat() {
  const {player, enemy} = store.getState().characters
  function playerAction() {
    return readlineSync.keyInSelect(COMBAT_ACTIONS, 'What do you choose to do?')
  }
  if (player.stamina <= 0) {
    console.log('You have died...')
    return store.dispatch(endCombat())
  }
  if (enemy.stamina <= 0) {
    console.log('You killed the enemy!')
    return store.dispatch(endCombat())
  }
  if (player.action && enemy.action) {
    return store.dispatch(calcCombat(player, enemy))
  }
  if (!enemy.action) {
    console.log(`${player.name} has ${player.stamina} stamina.`)
    console.log(`${enemy.name} has ${enemy.stamina} stamina.`)
    return store.dispatch(enemyChoice(COMBAT_ACTIONS[random(0, 4)]))
  }
  if (!player.action) {
    return store.dispatch(playerChoice(COMBAT_ACTIONS[playerAction()]))
  }
  return console.log('ERROR: something went wrong with the combat function')
}

function positiveOnly(number) {
  if (number < 0) {
    return 0
  }
  return number
}

function calcHit(attacker, defender, block) {
  const hitChance = attacker.proficiency[attacker.weapon.type]
  const blockBonus = block ? defender.proficiency[defender.weapon.type] : 0
  const missChance = defender.armor.protection[Object.keys(attacker.weapon.attack)] + blockBonus
  const percentChance = (hitChance / missChance) / 2
  console.log(hitChance, missChance, percentChance)
  if (percentChance < 0.1) {
    return random(0, 1.0) < 0.1
  }
  if (percentChance >= 1) {
    return true
  }
  return random(0, 1.0) < percentChance
}

function enemyHits(enemy) {
  const playerDamage = enemy.weapon.attack[0]
  return {
    player: playerDamage,
    enemy: 0,
  }
}

function playerHits(player) {
  const enemyDamage = player.weapon.attack[0]
  return {
    player: 0,
    enemy: enemyDamage,
  }
}

function bothTakeDmg(player, enemy) {
  const playerDamage = enemy.weapon.attack[0]
  const enemyDamage = player.weapon.attack[0]
  return {
    player: playerDamage,
    enemy: enemyDamage,
  }
}

function playerAttacks(player, enemy) { // eslint-disable-line fp/no-nil
  switch (enemy.action) {

    case A: {
      const enemyHit = calcHit(player, enemy)
      const playerHit = calcHit(enemy, player)
      if (enemyHit && playerHit) {
        msg(`Both ${player.name} and ${enemy.name} land hits on each other.`)
        return bothTakeDmg(player, enemy)
      }
      if (enemyHit) {
        msg(`${player.name} lands a hit, but ${enemy.name}'s strike misses.`)
        return playerHits(player)
      }
      if (playerHit) {
        msg(`${enemy.name} lands a hit, but ${player.name}'s strike misses.`)
        return enemyHits(enemy)
      }
      return {
        player: 0,
        enemy: 0,
      }
    }

    case C: {
      const playerHit = calcHit(enemy, player)
      if (playerHit) {
        msg(`${enemy.name} countered ${player.name}'s attack!`)
        return enemyHits(enemy)
      }
      msg(`${enemy.name} countered ${player.name}'s attack, but the return blow glanced off.`) // eslint-disable-line max-len
      return {
        player: 0,
        enemy: 0,
      }
    }

    case B: {
      const enemyHit = calcHit(player, enemy, true)
      if (enemyHit) {
        msg(`${player.name} broke through ${enemy.name}'s block and struck a blow.`)
        return playerHits(player)
      }
      msg(`${enemy.name} blocked ${player.name}'s attack.`)
      return {
        player: 0,
        enemy: 0,
      }
    }

    case T:
    case R: {
      console.log(calcHit(player, enemy))
      return playerHits(player)
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
      console.log(calcHit(player, enemy))
      console.log(calcHit(enemy, player))
      return bothTakeDmg(player, enemy)
    }

    case C: {
      console.log(calcHit(player, enemy))
      return playerHits(player)
    }

    case B: {
      return blockVsAttack(player, enemy)
    }

    case T:
    case R: {
      console.log(calcHit(enemy, player))
      return enemyHits(enemy)
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
