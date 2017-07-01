import random from 'lodash.random'
import readlineSync from 'readline-sync'
import {store} from 'state/store'
import {endCombat, calcCombat, enemyChoice, playerChoice} from 'state/actions/combatActions'

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

function getOnlyAttack(attacker) {
  const property = Object.getOwnPropertyNames(attacker.weapon.attack)[0]
  return attacker.weapon.attack[property]
}

function calcHit(attacker, defender, block) {
  const hitChance = attacker.proficiency[attacker.weapon.type]
  const blockBonus = block ? defender.proficiency[defender.weapon.type] : 0
  const missChance = defender.armor.protection[Object.keys(attacker.weapon.attack)] + blockBonus
  const percentChance = (hitChance / missChance) / 2
  if (percentChance < 0.1) {
    return random(0, 1.0) < 0.1
  }
  if (percentChance >= 1) {
    return true
  }
  return random(0, 1.0) < percentChance
}

function causeInjury(attacker, injured) { // eslint-disable-line fp/no-nil
  const injury = getOnlyAttack(attacker)
  switch (injured) {

    case 'player':
      return {
        player: injury,
        enemy: 0,
      }

    case 'enemy':
      return {
        player: 0,
        enemy: injury,
      }

    default:
      return {
        player: 0,
        enemy: 0,
      }

  }
}

function bothInjured(player, enemy) {
  const playerInjury = getOnlyAttack(enemy)
  const enemyInjury = getOnlyAttack(player)
  return {
    player: playerInjury,
    enemy: enemyInjury,
  }
}

function playerAttacks(player, enemy) { // eslint-disable-line fp/no-nil
  switch (enemy.action) {

    case A: {
      const enemyHit = calcHit(player, enemy)
      const playerHit = calcHit(enemy, player)
      if (enemyHit && playerHit) {
        console.log(`Both ${player.name} and ${enemy.name} land hits on each other.`)
        return bothInjured(player, enemy)
      }
      if (enemyHit) {
        console.log(`${player.name} lands a hit, but ${enemy.name}'s strike misses.`)
        return causeInjury(player, 'enemy')
      }
      if (playerHit) {
        console.log(`${enemy.name} lands a hit, but ${player.name}'s strike misses.`)
        return causeInjury(enemy, 'player')
      }
      return {
        player: 0,
        enemy: 0,
      }
    }

    case C: {
      const playerHit = calcHit(enemy, player)
      if (playerHit) {
        console.log(`${enemy.name} countered ${player.name}'s attack!`)
        return causeInjury(enemy, 'player')
      }
      console.log(`${enemy.name} countered ${player.name}'s attack, but the return blow glanced off.`) // eslint-disable-line max-len
      return {
        player: 0,
        enemy: 0,
      }
    }

    case B: {
      const enemyHit = calcHit(player, enemy, true)
      if (enemyHit) {
        console.log(`${player.name} broke through ${enemy.name}'s block and struck a blow.`)
        return causeInjury(player, 'enemy')
      }
      console.log(`${enemy.name} blocked ${player.name}'s attack.`)
      return {
        player: 0,
        enemy: 0,
      }
    }

    case T: {
      const enemyHit = calcHit(player, enemy)
      if (enemyHit) {
        console.log(`${player.name} landed a blow as ${enemy.name} failed at an attempt to trip.`)
        return causeInjury(player, 'enemy')
      }
      console.log(`${player.name}'s attack missed the mark, but foiled ${enemy.name}'s attempt to trip.`) // eslint-disable-line max-len
      return {
        player: 0,
        enemy: 0,
      }
    }

    case R: {
      const enemyHit = calcHit(player, enemy)
      if (enemyHit) {
        console.log(`${player.name} attacked ${enemy.name} while they retreated.`)
        return causeInjury(player, 'enemy')
      }
      console.log(`${player.name}'s blow glanced off of ${enemy.name} as they retreated.`) // eslint-disable-line max-len
      return {
        player: 0,
        enemy: 0,
      }
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

    case C: {
      const enemyHit = calcHit(enemy, enemy)
      if (enemyHit) {
        console.log(`${player.name} countered ${enemy.name}'s attack!`)
        return causeInjury(player, 'enemy')
      }
      console.log(`${player.name} countered ${enemy.name}'s attack, but the return blow glanced off.`) // eslint-disable-line max-len
      return {
        player: 0,
        enemy: 0,
      }
    }

    case B: {
      const playerHit = calcHit(enemy, player, true)
      if (playerHit) {
        console.log(`${enemy.name} broke through ${player.name}'s block and struck a blow.`)
        return causeInjury(enemy, 'player')
      }
      console.log(`${player.name} blocked ${enemy.name}'s attack.`)
      return {
        player: 0,
        enemy: 0,
      }
    }

    case T: {
      const playerHit = calcHit(enemy, player)
      if (playerHit) {
        console.log(`${enemy.name} landed a blow as ${player.name} failed at an attempt to trip.`)
        return causeInjury(enemy, 'enemy')
      }
      console.log(`${enemy.name}'s attack missed the mark, but foiled ${player.name}'s attempt to trip.`) // eslint-disable-line max-len
      return {
        player: 0,
        enemy: 0,
      }
    }

    case R: {
      const playerHit = calcHit(enemy, player)
      if (playerHit) {
        console.log(`${enemy.name} attacked ${player.name} while they retreated.`)
        return causeInjury(enemy, 'enemy')
      }
      console.log(`${enemy.name}'s blow glanced off of ${player.name} as they retreated.`) // eslint-disable-line max-len
      return {
        player: 0,
        enemy: 0,
      }
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
