import random from 'lodash.random'
import readlineSync from 'readline-sync'
import {
  COMBAT_ACTIONS,
  RECOVER,
  COMBAT_CHOICE,
  ATTACK_TYPE,
  CONDITION,
  STATUS,
} from 'constants/combat'
import {store} from 'state/store'
import {endCombat, calcCombat, enemyChoice, playerChoice} from 'state/actions/combatActions'
import * as Attack from './attack'
import * as Block from './block'
import * as Counter from './counter'
import * as Dodge from './dodge'
import * as Escape from './escape'
import * as Floor from './floor'
import * as Recover from './recover'

const {A, B, C, D, E, F, R} = COMBAT_CHOICE
const {CUT, PIERCE, BASH} = ATTACK_TYPE
const {BLEEDING, HEMORRHAGING, INTERNAL_BLEEDING} = CONDITION
const {READY, RECOVERING} = STATUS

export function combat() {
  const {player, enemy} = store.getState().characters
  function playerAction(actions) {
    return readlineSync.keyInSelect(actions, 'What do you choose to do?')
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
    if (enemy.status === READY) {
      return store.dispatch(enemyChoice(COMBAT_ACTIONS[random(0, 5)]))
    }
    return store.dispatch(enemyChoice(RECOVER[0]))
  }
  if (!player.action) {
    console.log(`${player.name} has ${player.stamina} stamina.`)
    console.log(`${enemy.name} has ${enemy.stamina} stamina.`)
    if (player.status === READY) {
      return store.dispatch(playerChoice(COMBAT_ACTIONS[playerAction(COMBAT_ACTIONS)]))
    }
    return store.dispatch(playerChoice(RECOVER[playerAction(RECOVER)]))
  }
  return console.log('ERROR: something went wrong with the combat function')
}

export const nothing = {
  damage: 0,
  condition: false,
  status: READY,
}

export const recovering = {
  damage: 0,
  condition: false,
  status: RECOVERING,
}

export const recovered = {
  damge: 0,
  condition: false,
  status: READY,
}

export function calcActions(player, enemy) { // eslint-disable-line fp/no-nil
  switch (player.action + enemy.action) {

    case A + A:
      return Attack.attack(player, enemy)

    case A + B:
      return Attack.block(player, enemy)

    case A + C:
      return Attack.counter(player, enemy)

    case A + D:
      return Attack.dodge(player, enemy)

    case A + E:
      return Attack.escape(player, enemy)

    case A + F:
      return Attack.floor(player, enemy)

    case A + R:
      return Attack.recover(player, enemy)

    case B + A:
      return Block.attack(player, enemy)

    case B + B:
      return Block.block(player, enemy)

    case B + C:
      return Block.counter(player, enemy)

    case B + D:
      return Block.dodge(player, enemy)

    case B + E:
      return Block.escape(player, enemy)

    case B + F:
      return Block.floor(player, enemy)

    case B + R:
      return Block.recover(player, enemy)

    case C + A:
      return Counter.attack(player, enemy)

    case C + B:
      return Counter.block(player, enemy)

    case C + C:
      return Counter.counter(player, enemy)

    case C + D:
      return Counter.dodge(player, enemy)

    case C + E:
      return Counter.escape(player, enemy)

    case C + F:
      return Counter.floor(player, enemy)

    case C + R:
      return Counter.recover(player, enemy)

    case D + A:
      return Dodge.attack(player, enemy)

    case D + B:
      return Dodge.block(player, enemy)

    case D + C:
      return Dodge.counter(player, enemy)

    case D + D:
      return Dodge.dodge(player, enemy)

    case D + E:
      return Dodge.escape(player, enemy)

    case D + F:
      return Dodge.floor(player, enemy)

    case D + R:
      return Dodge.recover(player, enemy)

    case E + A:
      return Escape.attack(player, enemy)

    case E + B:
      return Escape.block(player, enemy)

    case E + C:
      return Escape.counter(player, enemy)

    case E + D:
      return Escape.dodge(player, enemy)

    case E + E:
      return Escape.escape(player, enemy)

    case E + F:
      return Escape.floor(player, enemy)

    case E + R:
      return Escape.recover(player, enemy)

    case F + A:
      return Floor.attack(player, enemy)

    case F + B:
      return Floor.block(player, enemy)

    case F + C:
      return Floor.counter(player, enemy)

    case F + D:
      return Floor.dodge(player, enemy)

    case F + E:
      return Floor.escape(player, enemy)

    case F + F:
      return Floor.floor(player, enemy)

    case F + R:
      return Floor.recover(player, enemy)

    case R + A:
      return Recover.attack(player, enemy)

    case R + B:
      return Recover.block(player, enemy)

    case R + C:
      return Recover.counter(player, enemy)

    case R + D:
      return Recover.dodge(player, enemy)

    case R + E:
      return Recover.escape(player, enemy)

    case R + F:
      return Recover.floor(player, enemy)

    case R + R:
      return Recover.recover(player, enemy)

    default:
      return {
        player: nothing,
        enemy: nothing,
      }

  }
}

export function calcHit(attacker, defender, block) {
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

export function landHit(attacker) {
  const hit = chooseAttack(attacker)
  return {
    damage: hit.rating,
    condition: calcInjury(hit),
    status: RECOVERING,
  }
}

function chooseAttack(attacker) {
  const choices = Object.getOwnPropertyNames(attacker.weapon.attack)
  if (choices.length > 1) {
    const choice = readlineSync.keyInSelect(choices, 'How do you want to attack?')
    return {
      type: choices[choice],
      rating: attacker.weapon.attack[choices[choice]],
    }
  }
  return {
    type: choices[0],
    rating: attacker.weapon.attack[choices[0]],
  }
}

export function calcInjury(hit) { // eslint-disable-line fp/no-nil
  switch (hit.type) {

    case CUT: {
      const roll = random(0, 10)
      if (roll === 10) {
        return HEMORRHAGING
      }
      return BLEEDING
    }

    case PIERCE: {
      const roll = random(0, 10)
      const coinFlip = random(0, 1)
      if (roll === 10) {
        if (coinFlip === 0) {
          return INTERNAL_BLEEDING
        }
        return HEMORRHAGING
      }
      return BLEEDING
    }

    case BASH: {
      const roll = random(0, 10)
      if (roll < hit.rating) {
        return INTERNAL_BLEEDING
      }
      return false
    }

    default:
      return false

  }
}
